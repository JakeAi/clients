import { DIALOG_DATA, DialogConfig, DialogRef } from "@angular/cdk/dialog";
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { catchError, combineLatest, from, map, of, Subject, switchMap, takeUntil } from "rxjs";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { CollectionService } from "@bitwarden/common/abstractions/collection.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { CollectionData } from "@bitwarden/common/models/data/collection.data";
import { Collection } from "@bitwarden/common/models/domain/collection";
import { CollectionDetailsResponse } from "@bitwarden/common/models/response/collection.response";
import { ErrorResponse } from "@bitwarden/common/models/response/error.response";
import { DialogService } from "@bitwarden/components";

import { GroupService, GroupView } from "../core";
import {
  AccessItemType,
  AccessItemValue,
  AccessItemView,
  convertToPermission,
  convertToSelectionView,
  PermissionMode,
} from "../shared/components/access-selector";

/**
 * Indices for the available tabs in the dialog
 */
export enum GroupAddEditTabType {
  Info = 0,
  Members = 1,
  Collections = 2,
}

export interface GroupAddEditDialogParams {
  /**
   * ID of the organization the group belongs to
   */
  organizationId: string;

  /**
   * Optional ID of the group being modified
   */
  groupId?: string;

  /**
   * Tab to open when the dialog is open.
   * Defaults to Group Info
   */
  initialTab?: GroupAddEditTabType;
}

export enum GroupAddEditDialogResultType {
  Saved = "saved",
  Canceled = "canceled",
  Deleted = "deleted",
}

/**
 * Strongly typed helper to open a groupAddEditDialog
 * @param dialogService Instance of the dialog service that will be used to open the dialog
 * @param config Configuration for the dialog
 */
export const openGroupAddEditDialog = (
  dialogService: DialogService,
  config: DialogConfig<GroupAddEditDialogParams>
) => {
  return dialogService.open<GroupAddEditDialogResultType, GroupAddEditDialogParams>(
    GroupAddEditComponent,
    config
  );
};

@Component({
  selector: "app-group-add-edit",
  templateUrl: "group-add-edit.component.html",
})
export class GroupAddEditComponent implements OnInit, OnDestroy {
  protected PermissionMode = PermissionMode;
  protected ResultType = GroupAddEditDialogResultType;

  tabIndex: GroupAddEditTabType;
  loading = true;
  editMode = false;
  title: string;
  collections: AccessItemView[] = [];
  members: AccessItemView[] = [];
  group: GroupView;

  groupForm = this.formBuilder.group({
    accessAll: new FormControl(false),
    name: new FormControl("", Validators.required),
    externalId: new FormControl(""),
    members: new FormControl<AccessItemValue[]>([]),
    collections: new FormControl<AccessItemValue[]>([]),
  });

  get groupId(): string | undefined {
    return this.params.groupId;
  }

  get organizationId(): string {
    return this.params.organizationId;
  }

  private destroy$ = new Subject<void>();

  private get orgCollections$() {
    return from(this.apiService.getCollections(this.organizationId)).pipe(
      switchMap((response) => {
        return from(
          this.collectionService.decryptMany(
            response.data.map(
              (r) => new Collection(new CollectionData(r as CollectionDetailsResponse))
            )
          )
        );
      }),
      map((collections) =>
        collections.map<AccessItemView>((c) => ({
          id: c.id,
          type: AccessItemType.Collection,
          labelName: c.name,
          listName: c.name,
        }))
      )
    );
  }

  private get orgMembers$() {
    return from(this.apiService.getOrganizationUsers(this.organizationId)).pipe(
      map((response) =>
        response.data.map((m) => ({
          id: m.id,
          type: AccessItemType.Member,
          email: m.email,
          role: m.type,
          listName: m.name?.length > 0 ? `${m.name} (${m.email})` : m.email,
          labelName: m.name || m.email,
          status: m.status,
        }))
      )
    );
  }

  private get groupDetails$() {
    if (!this.editMode) {
      return of(undefined);
    }

    return combineLatest([
      this.groupService.get(this.organizationId, this.groupId),
      this.apiService.getGroupUsers(this.organizationId, this.groupId),
    ]).pipe(
      map(([groupView, users]) => {
        groupView.members = users;
        return groupView;
      }),
      catchError((e: unknown) => {
        if (e instanceof ErrorResponse) {
          this.logService.error(e.message);
        } else {
          this.logService.error(e.toString());
        }
        return of(undefined);
      })
    );
  }

  constructor(
    @Inject(DIALOG_DATA) private params: GroupAddEditDialogParams,
    private dialogRef: DialogRef<GroupAddEditDialogResultType>,
    private apiService: ApiService,
    private groupService: GroupService,
    private i18nService: I18nService,
    private collectionService: CollectionService,
    private platformUtilsService: PlatformUtilsService,
    private logService: LogService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.tabIndex = params.initialTab ?? GroupAddEditTabType.Info;
  }

  ngOnInit() {
    this.editMode = this.loading = this.groupId != null;
    this.title = this.i18nService.t(this.editMode ? "editGroup" : "addGroup");

    combineLatest([this.orgCollections$, this.orgMembers$, this.groupDetails$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([collections, members, group]) => {
        this.collections = collections;
        this.members = members;
        this.group = group;

        if (this.group != undefined) {
          // Must detect changes so that AccessSelector @Inputs() are aware of the latest
          // collections/members set above, otherwise no selected values will be patched below
          this.changeDetectorRef.detectChanges();

          this.groupForm.patchValue({
            name: this.group.name,
            externalId: this.group.externalId,
            accessAll: this.group.accessAll,
            members: this.group.members.map((m) => ({
              id: m,
              type: AccessItemType.Member,
            })),
            collections: this.group.collections.map((gc) => ({
              id: gc.id,
              type: AccessItemType.Collection,
              permission: convertToPermission(gc),
            })),
          });
        }

        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit = async () => {
    if (this.groupForm.invalid) {
      return;
    }

    const groupView = new GroupView();
    groupView.id = this.groupId;
    groupView.organizationId = this.organizationId;

    const formValue = this.groupForm.value;
    groupView.name = formValue.name;
    groupView.externalId = formValue.externalId;
    groupView.accessAll = formValue.accessAll;
    groupView.members = formValue.members?.map((m) => m.id) ?? [];

    if (!groupView.accessAll) {
      groupView.collections = formValue.collections.map((c) => convertToSelectionView(c));
    }

    try {
      await this.groupService.save(groupView);

      this.platformUtilsService.showToast(
        "success",
        null,
        this.i18nService.t(this.editMode ? "editedGroupId" : "createdGroupId", formValue.name)
      );
      this.dialogRef.close(GroupAddEditDialogResultType.Saved);
    } catch (e) {
      this.logService.error(e);
    }
  };

  delete = async () => {
    if (!this.editMode) {
      return;
    }

    const confirmed = await this.platformUtilsService.showDialog(
      this.i18nService.t("deleteGroupConfirmation"),
      this.group.name,
      this.i18nService.t("yes"),
      this.i18nService.t("no"),
      "warning",
      false,
      "app-group-add-edit .modal-content"
    );
    if (!confirmed) {
      return false;
    }

    try {
      await this.groupService.delete(this.organizationId, this.groupId);

      this.platformUtilsService.showToast(
        "success",
        null,
        this.i18nService.t("deletedGroupId", this.group.name)
      );
      this.dialogRef.close(GroupAddEditDialogResultType.Deleted);
    } catch (e) {
      this.logService.error(e);
    }
  };
}