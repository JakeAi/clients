"use strict";(self.webpackChunk_bitwarden_web_vault=self.webpackChunk_bitwarden_web_vault||[]).push([[920],{94920:(n,t,e)=>{e.r(t),e.d(t,{OrganizationImportExportModule:()=>dt});var o=e(55602),i=e(76528),a=e(78627),r=e(92236),s=e(31754),c=e(23031),p=e(33450),l=e(71146),u=e(25158),d=e(47064),f=e(43493),g=e(82083),h=e(85958),m=e(53562),x=e(24852),_=e(99721),U=e(87483),y=e(83924),v=e(66459),b=e(42304),k=e(98645),w=e(53481),Z=e(19419),Q=e(24610),S=e(25376),A=e(53707),I=e(90258),E=e(24637),J=e(11512),N=e(54666),C=e(1e4),T=e(36179),Y=e(44358),B=e(21656),q=e(82933),O=function(n,t,e,o){return new(e||(e=Promise))((function(i,a){function r(n){try{c(o.next(n))}catch(t){a(t)}}function s(n){try{c(o.throw(n))}catch(t){a(t)}}function c(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(r,s)}c((o=o.apply(n,t||[])).next())}))};function F(n,t){1&n&&(x.TgZ(0,"app-callout",15),x.ALo(1,"i18n"),x._uU(2),x.ALo(3,"i18n"),x.qZA()),2&n&&(x.s9C("title",x.lcZ(1,2,"vaultExportDisabled")),x.xp6(2),x.hij("\n    ",x.lcZ(3,4,"personalVaultExportPolicyInEffect"),"\n  "))}function P(n,t){if(1&n&&x._UZ(0,"app-export-scope-callout",16),2&n){const n=x.oxw(2);x.Q6J("organizationId",n.organizationId)}}function V(n,t){if(1&n&&(x.TgZ(0,"option",17),x._uU(1),x.qZA()),2&n){const n=t.$implicit;x.Q6J("value",n.value),x.xp6(1),x.Oqu(n.name)}}function L(n,t){if(1&n){const n=x.EpF();x.ynx(0),x._uU(1,"\n          "),x.TgZ(2,"bit-form-field"),x._uU(3,"\n            "),x.TgZ(4,"bit-label"),x._uU(5),x.ALo(6,"i18n"),x.qZA(),x._uU(7,"\n            "),x._UZ(8,"input",28),x._uU(9,"\n            "),x.TgZ(10,"button",29),x.NdJ("toggledChange",(function(t){x.CHM(n);const e=x.oxw(3);return x.KtG(e.showFilePassword=t)})),x.qZA(),x._uU(11,"\n            "),x.TgZ(12,"bit-hint"),x._uU(13),x.ALo(14,"i18n"),x.qZA(),x._uU(15,"\n          "),x.qZA(),x._uU(16,"\n          "),x.TgZ(17,"bit-form-field"),x._uU(18,"\n            "),x.TgZ(19,"bit-label"),x._uU(20),x.ALo(21,"i18n"),x.qZA(),x._uU(22,"\n            "),x._UZ(23,"input",30),x._uU(24,"\n            "),x.TgZ(25,"button",29),x.NdJ("toggledChange",(function(t){x.CHM(n);const e=x.oxw(3);return x.KtG(e.showFilePassword=t)})),x.qZA(),x._uU(26,"\n          "),x.qZA(),x._uU(27,"\n        "),x.BQk()}if(2&n){const n=x.oxw(3);x.xp6(5),x.Oqu(x.lcZ(6,5,"filePassword")),x.xp6(5),x.Q6J("toggled",n.showFilePassword),x.xp6(3),x.Oqu(x.lcZ(14,7,"exportPasswordDescription")),x.xp6(7),x.Oqu(x.lcZ(21,9,"confirmFilePassword")),x.xp6(5),x.Q6J("toggled",n.showFilePassword)}}function M(n,t){if(1&n&&(x.ynx(0),x._uU(1,"\n        "),x.TgZ(2,"div",18),x._uU(3,"\n          "),x.TgZ(4,"label",19),x._uU(5),x.ALo(6,"i18n"),x.qZA(),x._uU(7,"\n\n          "),x.TgZ(8,"div",20),x._uU(9,"\n            "),x.TgZ(10,"div"),x._uU(11,"\n              "),x._UZ(12,"input",21),x._uU(13,"\n            "),x.qZA(),x._uU(14,"\n            "),x.TgZ(15,"div"),x._uU(16,"\n              "),x.TgZ(17,"label",22),x._uU(18),x.ALo(19,"i18n"),x.qZA(),x._uU(20,"\n            "),x.qZA(),x._uU(21,"\n          "),x.qZA(),x._uU(22,"\n\n          "),x.TgZ(23,"div",23),x._uU(24),x.ALo(25,"i18n"),x.qZA(),x._uU(26,"\n\n          "),x.TgZ(27,"div",24),x._uU(28,"\n            "),x.TgZ(29,"div"),x._uU(30,"\n              "),x._UZ(31,"input",25),x._uU(32,"\n            "),x.qZA(),x._uU(33,"\n            "),x.TgZ(34,"div"),x._uU(35,"\n              "),x.TgZ(36,"label",26),x._uU(37),x.ALo(38,"i18n"),x.qZA(),x._uU(39,"\n            "),x.qZA(),x._uU(40,"\n          "),x.qZA(),x._uU(41,"\n\n          "),x.TgZ(42,"div",27),x._uU(43),x.ALo(44,"i18n"),x.qZA(),x._uU(45,"\n        "),x.qZA(),x._uU(46,"\n        "),x._UZ(47,"br"),x._uU(48,"\n\n        "),x.YNc(49,L,28,11,"ng-container",12),x._uU(50,"\n      "),x.BQk()),2&n){const n=x.oxw(2);x.xp6(5),x.hij("\n            ",x.lcZ(6,10,"exportTypeHeading"),"\n          "),x.xp6(7),x.Q6J("value",n.encryptedExportType.AccountEncrypted)("checked",n.fileEncryptionType===n.encryptedExportType.AccountEncrypted),x.xp6(6),x.hij("\n                ",x.lcZ(19,12,"accountRestricted"),"\n              "),x.xp6(6),x.hij("\n            ",x.lcZ(25,14,"accountRestrictedOptionDescription"),"\n          "),x.xp6(7),x.Q6J("value",n.encryptedExportType.FileEncrypted)("checked",n.fileEncryptionType===n.encryptedExportType.FileEncrypted),x.xp6(6),x.Oqu(x.lcZ(38,16,"passwordProtected")),x.xp6(6),x.hij("\n            ",x.lcZ(44,18,"passwordProtectedOptionDescription"),"\n          "),x.xp6(6),x.Q6J("ngIf",n.fileEncryptionType==n.encryptedExportType.FileEncrypted)}}const j=function(n){return{manual:n}};function z(n,t){if(1&n){const n=x.EpF();x.TgZ(0,"form",1,2),x.NdJ("ngSubmit",(function(){x.CHM(n);const t=x.oxw();return x.KtG(t.submit())})),x._uU(2,"\n  "),x.TgZ(3,"div",3),x._uU(4,"\n    "),x.TgZ(5,"h1"),x._uU(6),x.ALo(7,"i18n"),x.qZA(),x._uU(8,"\n  "),x.qZA(),x._uU(9,"\n\n  "),x.YNc(10,F,4,6,"app-callout",4),x._uU(11,"\n  "),x.YNc(12,P,1,1,"app-export-scope-callout",5),x._uU(13,"\n\n  "),x.TgZ(14,"div",6),x._uU(15,"\n    "),x.TgZ(16,"div",7),x._uU(17,"\n      "),x.TgZ(18,"bit-form-field"),x._uU(19,"\n        "),x.TgZ(20,"bit-label",8),x._uU(21),x.ALo(22,"i18n"),x.qZA(),x._uU(23,"\n        "),x.TgZ(24,"select",9),x._uU(25,"\n          "),x.YNc(26,V,2,2,"option",10),x._uU(27,"\n        "),x.qZA(),x._uU(28,"\n      "),x.qZA(),x._uU(29,"\n    "),x.qZA(),x._uU(30,"\n  "),x.qZA(),x._uU(31,"\n  "),x.TgZ(32,"div",6),x._uU(33,"\n    "),x.TgZ(34,"div",11),x._uU(35,"\n      "),x.YNc(36,M,51,20,"ng-container",12),x._uU(37,"\n\n      "),x.TgZ(38,"button",13),x._uU(39,"\n        "),x._UZ(40,"i",14),x.ALo(41,"i18n"),x._uU(42,"\n        "),x.TgZ(43,"span"),x._uU(44),x.ALo(45,"i18n"),x.qZA(),x._uU(46,"\n      "),x.qZA(),x._uU(47,"\n    "),x.qZA(),x._uU(48,"\n  "),x.qZA(),x._uU(49,"\n"),x.qZA()}if(2&n){const n=x.MAs(1),t=x.oxw();x.Q6J("appApiAction",t.formPromise)("formGroup",t.exportForm),x.xp6(6),x.Oqu(x.lcZ(7,12,"exportVault")),x.xp6(4),x.Q6J("ngIf",t.disabledByPolicy),x.xp6(2),x.Q6J("ngIf",!t.disabledByPolicy),x.xp6(9),x.Oqu(x.lcZ(22,14,"fileFormat")),x.xp6(5),x.Q6J("ngForOf",t.formatOptions),x.xp6(10),x.Q6J("ngIf","encrypted_json"===t.format),x.xp6(2),x.Q6J("disabled",n.loading||t.disabledByPolicy)("ngClass",x.VKq(20,j,t.disabledByPolicy)),x.xp6(2),x.s9C("title",x.lcZ(41,16,"loading")),x.xp6(4),x.Oqu(x.lcZ(45,18,"confirmFormat"))}}class D extends m.Y{constructor(n,t,e,o,i,a,r,s,c,p,l,u){super(n,t,e,o,i,r,s,c,p,l,u),this.route=a}get disabledByPolicy(){return!1}ngOnInit(){const n=Object.create(null,{ngOnInit:{get:()=>super.ngOnInit}});return O(this,void 0,void 0,(function*(){this.route.parent.parent.params.subscribe((n=>O(this,void 0,void 0,(function*(){this.organizationId=n.organizationId})))),yield n.ngOnInit.call(this)}))}getExportData(){return this.isFileEncryptedExport?this.exportService.getPasswordProtectedExport(this.filePassword,this.organizationId):this.exportService.getOrganizationExport(this.organizationId,this.format)}getFileName(){return super.getFileName("org")}collectEvent(){return O(this,void 0,void 0,(function*(){yield this.eventCollectionService.collect(g.tw.Organization_ClientExportedVault,null,null,this.organizationId)}))}}D.ɵfac=function(n){return new(n||D)(x.Y36(i.$),x.Y36(a.D),x.Y36(_.P),x.Y36(h.qX),x.Y36(U.j),x.Y36(u.gz),x.Y36(y.d),x.Y36(v.$),x.Y36(b.i),x.Y36(k.QS),x.Y36(w._),x.Y36(f.eo))},D.ɵcmp=x.Xpm({type:D,selectors:[["app-org-export"]],features:[x.qOj],decls:4,vars:1,consts:[[3,"appApiAction","formGroup","ngSubmit",4,"ngIf"],[3,"appApiAction","formGroup","ngSubmit"],["form",""],[1,"page-header"],["type","error",3,"title",4,"ngIf"],[3,"organizationId",4,"ngIf"],[1,"row"],[1,"col-6"],["for","format",1,"tw-text-lg"],["bitInput","","name","format","formControlName","format"],[3,"value",4,"ngFor","ngForOf"],[1,"form-group","col-6"],[4,"ngIf"],["type","submit",1,"btn","btn-primary","btn-submit",3,"disabled","ngClass"],["aria-hidden","true",1,"bwi","bwi-spinner","bwi-spin",3,"title"],["type","error",3,"title"],[3,"organizationId"],[3,"value"],["role","radiogroup","aria-labelledby","exportTypeHeading"],["id","exportTypeHeading",1,"tw-semi-bold","tw-text-lg"],["appBoxRow","","name","FileTypeOptions",1,"tw-flex","tw-items-center"],["type","radio","name","fileEncryptionType","id","AccountEncrypted","formControlName","fileEncryptionType",1,"radio",3,"value","checked"],["for","AccountEncrypted",1,"tw-semi-bold","tw-text-md","tw-my-1","tw-ml-1"],[1,"tw-regular","ml-3","pb-2","tw-text-sm"],[1,"tw-flex","tw-items-center"],["type","radio","name","fileEncryptionType","id","FileEncrypted","formControlName","fileEncryptionType",1,"radio",3,"value","checked"],["for","FileEncrypted",1,"tw-semi-bold","tw-text-md","tw-my-1","tw-ml-1"],[1,"tw-regular","ml-3","tw-text-sm"],["bitInput","","type","password","id","filePassword","formControlName","filePassword","name","password"],["type","button","bitSuffix","","bitIconButton","","bitPasswordInputToggle","",3,"toggled","toggledChange"],["bitInput","","type","password","id","confirmFilePassword","formControlName","confirmFilePassword","name","confirmFilePassword"]],template:function(n,t){1&n&&(x._uU(0,"\n"),x._uU(1,"\n"),x.YNc(2,z,50,22,"form",0),x._uU(3,"\n")),2&n&&(x.xp6(2),x.Q6J("ngIf",t.exportForm))},dependencies:[Z.mk,Z.sg,Z.O5,k._Y,k.YN,k.Kr,k.Fj,k.EJ,k._,k.JJ,k.JL,k.sg,k.u,Q.b,S.$,A.O,I.N,E.d,J.G,N.w,C.e,T.u,Y.M,B.Q,q.C],encapsulation:2});var K=e(30359),G=e(68362),X=e(77494),R=e(58691),H=e(55670),$=e(4871),W=e(28975),nn=e(30469),tn=function(n,t,e,o){return new(e||(e=Promise))((function(i,a){function r(n){try{c(o.next(n))}catch(t){a(t)}}function s(n){try{c(o.throw(n))}catch(t){a(t)}}function c(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(r,s)}c((o=o.apply(n,t||[])).next())}))};function en(n,t){1&n&&(x.TgZ(0,"app-callout",22),x._uU(1),x.ALo(2,"i18n"),x.qZA()),2&n&&(x.xp6(1),x.hij("\n  ",x.lcZ(2,1,"personalOwnershipPolicyInEffectImports"),"\n"))}function on(n,t){if(1&n&&x._UZ(0,"bit-option",23),2&n){const n=t.$implicit;x.Q6J("value",n.id)("label",n.name)}}function an(n,t){if(1&n&&x._UZ(0,"bit-option",23),2&n){const n=t.$implicit;x.Q6J("value",n.id)("label",n.name)}}function rn(n,t){if(1&n&&(x.ynx(0),x._uU(1,"\n        "),x._UZ(2,"bit-option",24),x._uU(3,"\n        "),x.YNc(4,an,1,2,"bit-option",7),x._uU(5,"\n      "),x.BQk()),2&n){const n=x.oxw();x.xp6(4),x.Q6J("ngForOf",n.importOptions)}}function sn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      See detailed instructions on our help site at\n      "),x.TgZ(2,"a",26),x._uU(3,"\n        https://bitwarden.com/help/export-your-data/"),x.qZA(),x._uU(4,"\n    "),x.BQk())}function cn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      See detailed instructions on our help site at\n      "),x.TgZ(2,"a",27),x._uU(3,"\n        https://bitwarden.com/help/import-from-lastpass/"),x.qZA(),x._uU(4,"\n    "),x.BQk())}function pn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the KeePassX desktop application, navigate to "Database" → "Export to CSV file" and\n      save the CSV file.\n    '),x.BQk())}function ln(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      In the Avira web vault, go to "Settings" → "My Data" → "Export data" and save the\n      CSV file.\n    '),x.BQk())}function un(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      In the Blur web vault, click your username at the top and go to "Settings" → "Export\n      Data", then click "Export CSV" for your "Accounts".\n    '),x.BQk())}function dn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the SaveInCloud desktop application, navigate to "File" → "Export" → "As XML"\n      and save the XML file.\n    '),x.BQk())}function fn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Padlock desktop application, click the hamburger icon in the top left corner and\n      navigate to "Settings" → "Export" button and save the file "As CSV".\n    '),x.BQk())}function gn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the KeePass 2 desktop application, navigate to "File" → "Export" and select the\n      "KeePass XML (2.x)" option.\n    '),x.BQk())}function hn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Universal Password Manager desktop application, navigate to "Database" →\n      "Export" and save the CSV file.\n    '),x.BQk())}function mn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the SaferPass browser extension, click the hamburger icon in the top left corner and\n      navigate to "Settings". Click the "Export accounts" button to save the CSV file.\n    '),x.BQk())}function xn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Meldium web vault, navigate to "Settings". Locate the "Export data" function and\n      click "Show me my data" to save the CSV file.\n    '),x.BQk())}function _n(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log into the Keeper web vault (keepersecurity.com/vault). Click on your "account email" (top\n      right) and select "Settings". Go to "Export" and find the "Export to .csv File" option. Click\n      "Export" to save the CSV file.\n    '),x.BQk())}function Un(n,t){1&n&&(x.TgZ(0,"span"),x._uU(1,"\n        The process is exactly the same as importing from Google Chrome.\n      "),x.qZA())}function yn(n,t){if(1&n&&(x.ynx(0),x._uU(1,"\n      "),x.YNc(2,Un,2,0,"span",8),x._uU(3,"\n      See detailed instructions on our help site at\n      "),x.TgZ(4,"a",28),x._uU(5,"\n        https://bitwarden.com/help/import-from-chrome/"),x.qZA(),x._uU(6,"\n    "),x.BQk()),2&n){const n=x.oxw(2);x.xp6(2),x.Q6J("ngIf","chromecsv"!==n.format)}}function vn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      See detailed instructions on our help site at\n      "),x.TgZ(2,"a",29),x._uU(3,"\n        https://bitwarden.com/help/import-from-firefox/"),x.qZA(),x._uU(4,".\n    "),x.BQk())}function bn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      See detailed instructions on our help site at\n      "),x.TgZ(2,"a",30),x._uU(3,"\n        https://bitwarden.com/help/import-from-safari/"),x.qZA(),x._uU(4,".\n    "),x.BQk())}function kn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      See detailed instructions on our help site at\n      "),x.TgZ(2,"a",31),x._uU(3,"\n        https://bitwarden.com/help/import-from-1password/"),x.qZA(),x._uU(4,".\n    "),x.BQk())}function wn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Password Dragon desktop application, navigate to "File" → "Export" → "To\n      XML". In the dialog that pops up select "All Rows" and check all fields. Click the "Export"\n      button and save the XML file.\n    '),x.BQk())}function Zn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Enpass desktop application, navigate to "File" → "Export" → "As CSV".\n      Select "OK" to the warning alert and save the CSV file. Note that the importer only supports\n      files exported while Enpass is set to the English language, so adjust your settings\n      accordingly.\n    '),x.BQk())}function Qn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Enpass 6 desktop application, click the menu button and navigate to "File" →\n      "Export". Select the ".json" file format option and save the JSON file.\n    '),x.BQk())}function Sn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Password Safe desktop application, navigate to "File" → "Export To" → "XML\n      format..." and save the XML file.\n    '),x.BQk())}function An(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log in to Dashlane, click on "My Account" → "Settings" → "Export file" and select\n      "Export as a CSV file". This will download a zip archive containing various CSV files. Unzip\n      the archive and import each CSV file individually.\n    '),x.BQk())}function In(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      Dashlane no longer supports the JSON format. Only use this if you have an existing JSON for\n      import. Use the CSV importer when creating new exports.\n    "),x.BQk())}function En(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the mSecure desktop application, navigate to "File" → "Export" → "CSV File..."\n      and save the CSV file.\n    '),x.BQk())}function Jn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Sticky Password desktop application, navigate to "Menu" (top right) → "Export"\n      → "Export all". Select the unencrypted format XML option and save the XML file.\n    '),x.BQk())}function Nn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the True Key desktop application, click the gear icon (top right) and then navigate to\n      "App Settings". Click the "Export" button, enter your password and save the CSV file.\n    '),x.BQk())}function Cn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log into the Clipperz web application (clipperz.is/app). Click the hamburger menu icon in the\n      top right to expand the navigation bar. Navigate to "Data" → "Export". Click the\n      "download HTML+JSON" button to save the HTML file.\n    '),x.BQk())}function Tn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the RoboForm Editor desktop application, navigate to "RoboForm" (top left) →\n      "Options" → "Account & Data" and click the "Export" button. Select all of your data,\n      change the "Format" to "CSV file" and then click the "Export" button to save the CSV file.\n      Note: RoboForm only allows you to export Logins. Other items will not be exported.\n    '),x.BQk())}function Yn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log into the Passbolt web vault and navigate to the "Passwords" listing. Select all of the\n      passwords you would like to export and click the "Export" button at the top of the listing.\n      Choose the "csv (lastpass)" export format and click the "Export" button.\n    '),x.BQk())}function Bn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Ascendo DataVault desktop application, navigate to "Tools" → "Export". In the\n      dialog that pops up, select the "All Items (DVX, CSV)" option. Click the "Ok" button to save\n      the CSV file.\n    '),x.BQk())}function qn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Password Boss desktop application, navigate to "File" → "Export data" →\n      "Password Boss JSON - not encrypted" and save the JSON file.\n    '),x.BQk())}function On(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log into the Zoho web vault (vault.zoho.com). Navigate to "Tools" → "Export Secrets".\n      Select "All Secrets" and click the "Zoho Vault Format CSV" button. Highlight and copy the data\n      from the textarea. Open a text editor like Notepad and paste the data. Save the data from the\n      text editor as\n      '),x.TgZ(2,"code"),x._uU(3,"zoho_export.csv"),x.qZA(),x._uU(4,".\n    "),x.BQk())}function Fn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the SplashID Safe desktop application, click on the SplashID blue lock logo in the top\n      right corner. Navigate to "Export" → "Export as CSV" and save the CSV file.\n    '),x.BQk())}function Pn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the PassKeep mobile app, navigate to "Backup/Restore". Locate the "CSV Backup/Restore"\n      section and click "Backup to CSV" to save the CSV file.\n    '),x.BQk())}function Vn(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      Make sure you have python-keyring and python-gnomekeyring installed. Save the\n      "),x.TgZ(2,"a",32),x._uU(3,"GNOME Keyring Import/Export"),x.qZA(),x._uU(4,"\n      python script to your desktop as "),x.TgZ(5,"code"),x._uU(6,"pw_helper.py"),x.qZA(),x._uU(7,". Open terminal and run\n      "),x.TgZ(8,"code"),x._uU(9,"chmod +rx Desktop/pw_helper.py"),x.qZA(),x._uU(10," and then\n      "),x.TgZ(11,"code"),x._uU(12,"python Desktop/pw_helper.py export Desktop/my_passwords.json"),x.qZA(),x._uU(13,". Then upload the\n      resulting "),x.TgZ(14,"code"),x._uU(15,"my_passwords.json"),x.qZA(),x._uU(16," file here to Bitwarden.\n    "),x.BQk())}function Ln(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Using the Password Agent desktop application navigate to "File" → "Export", select the\n      "Fields to export" button and check all of the fields, change the "Output format" to "CSV",\n      and then click the "Start" button to save the CSV file.\n    '),x.BQk())}function Mn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log into the Passpack website vault and navigate to "Settings" → "Export", then click the\n      "Download" button to save the CSV file.\n    '),x.BQk())}function jn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open your Passman vault and click on "Settings" in the bottom left corner. In the "Settings"\n      window switch to the "Export credentials" tab and choose "JSON" as the export type. Enter your\n      vault\'s passphrase and click the "Export" button to save the JSON file.\n    '),x.BQk())}function zn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Avast Passwords desktop application and navigate to "Settings" → "Import/export\n      data". Select the "Export" button for the "Export to CSV file" option to save the CSV file.\n    '),x.BQk())}function Dn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Avast Passwords desktop application and navigate to "Settings" → "Import/export\n      data". Select the "Export" button for the "Export to JSON file" option to save the JSON file.\n    '),x.BQk())}function Kn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the F-Secure KEY desktop application and navigate to "Settings" → "Export\n      Passwords". Select the "Export" button, enter your master password, and save the FSK file.\n    '),x.BQk())}function Gn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Kaspersky Password Manager desktop application and navigate to "Settings" →\n      "Import/Export". Locate the "Export to text file" section and select the "Export" button to\n      save the TXT file.\n    '),x.BQk())}function Xn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the RememBear desktop application and navigate to "Settings" → "Account" →\n      "Export". Enter your master password and select the "Export Anyway" button to save the CSV\n      file.\n    '),x.BQk())}function Rn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the PasswordWallet desktop application and navigate to "File" → "Export" →\n      "Visible entries to text file". Enter your password and select the "Ok" button to save the TXT\n      file.\n    '),x.BQk())}function Hn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Myki desktop browser extension and navigate to "Advanced" → "Export Accounts"\n      and then scan the QR code with your mobile device. Various CSV files will then be saved to\n      your computer\'s downloads folder.\n    '),x.BQk())}function $n(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      Export your SecureSafe password safe to a CSV file with a comma delimiter.\n    "),x.BQk())}function Wn(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the LogMeOnce browser extension, then navigate to "Open Menu" → "Export To" and\n      select "CSV File" to save the CSV file.\n    '),x.BQk())}function nt(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the BlackBerry Password Keeper application, then navigate to "Settings" →\n      "Import/Export". Select "Export Passwords" and follow the instructions on screen to save the\n      unencrypted CSV file.\n    '),x.BQk())}function tt(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Buttercup desktop application and unlock your vault. Right click on your vault\'s icon\n      and select "Export" to save the CSV file.\n    '),x.BQk())}function et(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Open the Codebook desktop application and log in. Navigate to "File" → "Export all", then\n      click "Yes" on the dialog and save the CSV file.\n    '),x.BQk())}function ot(n,t){1&n&&(x.ynx(0),x._uU(1,"\n      Open the newest version of the Encryptr desktop application and allow all of your data to\n      sync. Once syncing of your data is complete, the download icon in the top right corner will\n      turn pink. Click the download icon and save the CSV file.\n    "),x.BQk())}function it(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      From the Yoti browser extension, click on "Settings", then "Export Saved Logins" and save the\n      CSV file.\n    '),x.BQk())}function at(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log in to the Psono web vault, click on the "Signed in as"-dropdown, select "Others". Go to\n      the "Export"-tab and select the json type export and then click on Export.\n    '),x.BQk())}function rt(n,t){1&n&&(x.ynx(0),x._uU(1,'\n      Log in to "https://vault.passky.org" → "Import & Export" → "Export" in the Passky\n      section. ("Backup" is unsupported as it is encrypted).\n    '),x.BQk())}function st(n,t){if(1&n&&(x.TgZ(0,"app-callout",25),x._uU(1,"\n    "),x.YNc(2,sn,5,0,"ng-container",8),x._uU(3,"\n    "),x.YNc(4,cn,5,0,"ng-container",8),x._uU(5,"\n    "),x.YNc(6,pn,2,0,"ng-container",8),x._uU(7,"\n    "),x.YNc(8,ln,2,0,"ng-container",8),x._uU(9,"\n    "),x.YNc(10,un,2,0,"ng-container",8),x._uU(11,"\n    "),x.YNc(12,dn,2,0,"ng-container",8),x._uU(13,"\n    "),x.YNc(14,fn,2,0,"ng-container",8),x._uU(15,"\n    "),x.YNc(16,gn,2,0,"ng-container",8),x._uU(17,"\n    "),x.YNc(18,hn,2,0,"ng-container",8),x._uU(19,"\n    "),x.YNc(20,mn,2,0,"ng-container",8),x._uU(21,"\n    "),x.YNc(22,xn,2,0,"ng-container",8),x._uU(23,"\n    "),x.YNc(24,_n,2,0,"ng-container",8),x._uU(25,"\n    "),x._uU(26,"\n    "),x.YNc(27,yn,7,1,"ng-container",8),x._uU(28,"\n    "),x.YNc(29,vn,5,0,"ng-container",8),x._uU(30,"\n    "),x.YNc(31,bn,5,0,"ng-container",8),x._uU(32,"\n    "),x.YNc(33,kn,5,0,"ng-container",8),x._uU(34,"\n    "),x.YNc(35,wn,2,0,"ng-container",8),x._uU(36,"\n    "),x.YNc(37,Zn,2,0,"ng-container",8),x._uU(38,"\n    "),x.YNc(39,Qn,2,0,"ng-container",8),x._uU(40,"\n    "),x.YNc(41,Sn,2,0,"ng-container",8),x._uU(42,"\n    "),x.YNc(43,An,2,0,"ng-container",8),x._uU(44,"\n    "),x.YNc(45,In,2,0,"ng-container",8),x._uU(46,"\n    "),x.YNc(47,En,2,0,"ng-container",8),x._uU(48,"\n    "),x.YNc(49,Jn,2,0,"ng-container",8),x._uU(50,"\n    "),x.YNc(51,Nn,2,0,"ng-container",8),x._uU(52,"\n    "),x.YNc(53,Cn,2,0,"ng-container",8),x._uU(54,"\n    "),x.YNc(55,Tn,2,0,"ng-container",8),x._uU(56,"\n    "),x.YNc(57,Yn,2,0,"ng-container",8),x._uU(58,"\n    "),x.YNc(59,Bn,2,0,"ng-container",8),x._uU(60,"\n    "),x.YNc(61,qn,2,0,"ng-container",8),x._uU(62,"\n    "),x.YNc(63,On,5,0,"ng-container",8),x._uU(64,"\n    "),x.YNc(65,Fn,2,0,"ng-container",8),x._uU(66,"\n    "),x.YNc(67,Pn,2,0,"ng-container",8),x._uU(68,"\n    "),x.YNc(69,Vn,17,0,"ng-container",8),x._uU(70,"\n    "),x.YNc(71,Ln,2,0,"ng-container",8),x._uU(72,"\n    "),x.YNc(73,Mn,2,0,"ng-container",8),x._uU(74,"\n    "),x.YNc(75,jn,2,0,"ng-container",8),x._uU(76,"\n    "),x.YNc(77,zn,2,0,"ng-container",8),x._uU(78,"\n    "),x.YNc(79,Dn,2,0,"ng-container",8),x._uU(80,"\n    "),x.YNc(81,Kn,2,0,"ng-container",8),x._uU(82,"\n    "),x.YNc(83,Gn,2,0,"ng-container",8),x._uU(84,"\n    "),x.YNc(85,Xn,2,0,"ng-container",8),x._uU(86,"\n    "),x.YNc(87,Rn,2,0,"ng-container",8),x._uU(88,"\n    "),x.YNc(89,Hn,2,0,"ng-container",8),x._uU(90,"\n    "),x.YNc(91,$n,2,0,"ng-container",8),x._uU(92,"\n    "),x.YNc(93,Wn,2,0,"ng-container",8),x._uU(94,"\n    "),x.YNc(95,nt,2,0,"ng-container",8),x._uU(96,"\n    "),x.YNc(97,tt,2,0,"ng-container",8),x._uU(98,"\n    "),x.YNc(99,et,2,0,"ng-container",8),x._uU(100,"\n    "),x.YNc(101,ot,2,0,"ng-container",8),x._uU(102,"\n    "),x.YNc(103,it,2,0,"ng-container",8),x._uU(104,"\n    "),x.YNc(105,at,2,0,"ng-container",8),x._uU(106,"\n    "),x.YNc(107,rt,2,0,"ng-container",8),x._uU(108,"\n  "),x.qZA()),2&n){const n=x.oxw();x.s9C("title",n.getFormatInstructionTitle()),x.xp6(2),x.Q6J("ngIf","bitwardencsv"===n.format||"bitwardenjson"===n.format),x.xp6(2),x.Q6J("ngIf","lastpasscsv"===n.format),x.xp6(2),x.Q6J("ngIf","keepassxcsv"===n.format),x.xp6(2),x.Q6J("ngIf","aviracsv"===n.format),x.xp6(2),x.Q6J("ngIf","blurcsv"===n.format),x.xp6(2),x.Q6J("ngIf","safeincloudxml"===n.format),x.xp6(2),x.Q6J("ngIf","padlockcsv"===n.format),x.xp6(2),x.Q6J("ngIf","keepass2xml"===n.format),x.xp6(2),x.Q6J("ngIf","upmcsv"===n.format),x.xp6(2),x.Q6J("ngIf","saferpasscsv"===n.format),x.xp6(2),x.Q6J("ngIf","meldiumcsv"===n.format),x.xp6(2),x.Q6J("ngIf","keepercsv"===n.format),x.xp6(3),x.Q6J("ngIf","chromecsv"===n.format||"operacsv"===n.format||"vivaldicsv"===n.format),x.xp6(2),x.Q6J("ngIf","firefoxcsv"===n.format),x.xp6(2),x.Q6J("ngIf","safaricsv"===n.format),x.xp6(2),x.Q6J("ngIf","1password1pux"===n.format||"1password1pif"===n.format||"1passwordwincsv"===n.format||"1passwordmaccsv"===n.format),x.xp6(2),x.Q6J("ngIf","passworddragonxml"===n.format),x.xp6(2),x.Q6J("ngIf","enpasscsv"===n.format),x.xp6(2),x.Q6J("ngIf","enpassjson"===n.format),x.xp6(2),x.Q6J("ngIf","pwsafexml"===n.format),x.xp6(2),x.Q6J("ngIf","dashlanecsv"===n.format),x.xp6(2),x.Q6J("ngIf","dashlanejson"===n.format),x.xp6(2),x.Q6J("ngIf","msecurecsv"===n.format),x.xp6(2),x.Q6J("ngIf","stickypasswordxml"===n.format),x.xp6(2),x.Q6J("ngIf","truekeycsv"===n.format),x.xp6(2),x.Q6J("ngIf","clipperzhtml"===n.format),x.xp6(2),x.Q6J("ngIf","roboformcsv"===n.format),x.xp6(2),x.Q6J("ngIf","passboltcsv"===n.format),x.xp6(2),x.Q6J("ngIf","ascendocsv"===n.format),x.xp6(2),x.Q6J("ngIf","passwordbossjson"===n.format),x.xp6(2),x.Q6J("ngIf","zohovaultcsv"===n.format),x.xp6(2),x.Q6J("ngIf","splashidcsv"===n.format),x.xp6(2),x.Q6J("ngIf","passkeepcsv"===n.format),x.xp6(2),x.Q6J("ngIf","gnomejson"===n.format),x.xp6(2),x.Q6J("ngIf","passwordagentcsv"===n.format),x.xp6(2),x.Q6J("ngIf","passpackcsv"===n.format),x.xp6(2),x.Q6J("ngIf","passmanjson"===n.format),x.xp6(2),x.Q6J("ngIf","avastcsv"===n.format),x.xp6(2),x.Q6J("ngIf","avastjson"===n.format),x.xp6(2),x.Q6J("ngIf","fsecurefsk"===n.format),x.xp6(2),x.Q6J("ngIf","kasperskytxt"===n.format),x.xp6(2),x.Q6J("ngIf","remembearcsv"===n.format),x.xp6(2),x.Q6J("ngIf","passwordwallettxt"===n.format),x.xp6(2),x.Q6J("ngIf","mykicsv"===n.format),x.xp6(2),x.Q6J("ngIf","securesafecsv"===n.format),x.xp6(2),x.Q6J("ngIf","logmeoncecsv"===n.format),x.xp6(2),x.Q6J("ngIf","blackberrycsv"===n.format),x.xp6(2),x.Q6J("ngIf","buttercupcsv"===n.format),x.xp6(2),x.Q6J("ngIf","codebookcsv"===n.format),x.xp6(2),x.Q6J("ngIf","encryptrcsv"===n.format),x.xp6(2),x.Q6J("ngIf","yoticsv"===n.format),x.xp6(2),x.Q6J("ngIf","psonojson"===n.format),x.xp6(2),x.Q6J("ngIf","passkyjson"===n.format)}}const ct=function(n){return{manual:n}};class pt extends H.k{get importBlockedByPolicy(){return!1}constructor(n,t,e,o,i,a,r,s,c,p,l){super(n,t,e,i,a,s,c,p,l),this.route=o,this.organizationService=r}ngOnInit(){this.route.params.pipe((0,K.w)((n=>this.organizationService.get$(n.organizationId))),(0,G.R)(this.destroy$)).subscribe((n=>{this.organizationId=n.id,this.organization=n})),super.ngOnInit()}onSuccessfulImport(){return tn(this,void 0,void 0,(function*(){(0,R.Po)(this.organization)?yield this.router.navigate(["organizations",this.organizationId,"vault"]):(this.fileSelected=null,this.fileContents="")}))}submit(){const n=Object.create(null,{submit:{get:()=>super.submit}});return tn(this,void 0,void 0,(function*(){(yield this.dialogService.openSimpleDialog({title:{key:"warning"},content:{key:"importWarning",placeholders:[this.organization.name]},type:f.rC.WARNING}))&&n.submit.call(this)}))}}pt.ɵfac=function(n){return new(n||pt)(x.Y36(a.D),x.Y36(p.wF),x.Y36(u.F0),x.Y36(u.gz),x.Y36(_.P),x.Y36(y.d),x.Y36(R.Mn),x.Y36(v.$),x.Y36(X.Z),x.Y36($._),x.Y36(f.eo))},pt.ɵcmp=x.Xpm({type:pt,selectors:[["app-org-import"]],features:[x.qOj],decls:74,vars:38,consts:[[1,"page-header"],["type","info",4,"ngIf"],["ngNativeValidate","",3,"ngSubmit"],["form",""],[1,"tw-w-1/2"],["for","type"],["id","type","name","Format","bitInput","","required","",3,"ngModel","disabled","ngModelChange"],[3,"value","label",4,"ngFor","ngForOf"],[4,"ngIf"],["type","info",3,"title",4,"ngIf"],[1,"row"],[1,"col-6"],[1,"form-group"],["for","file"],[1,"file-selector"],["type","button",1,"btn","btn-outline-primary",3,"disabled","click"],["type","file","id","file","name","file","hidden","",1,"form-control-file",3,"disabled","change"],["fileSelector",""],["for","fileContents"],["id","fileContents","name","FileContents",1,"form-control",3,"ngModel","disabled","ngModelChange"],["type","submit",1,"btn","btn-primary","btn-submit",3,"disabled","ngClass"],["aria-hidden","true",1,"bwi","bwi-spinner","bwi-spin",3,"title"],["type","info"],[3,"value","label"],["value","-","disabled",""],["type","info",3,"title"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/export-your-data/"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/import-from-lastpass/"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/import-from-chrome/"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/import-from-firefox/"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/import-from-safari/"],["target","_blank","rel","noopener","href","https://bitwarden.com/help/import-from-1password/"],["target","_blank","rel","noopener","href","https://bit.ly/2GpOMTg"]],template:function(n,t){if(1&n){const n=x.EpF();x.TgZ(0,"div",0),x._uU(1,"\n  "),x.TgZ(2,"h1"),x._uU(3),x.ALo(4,"i18n"),x.qZA(),x._uU(5,"\n"),x.qZA(),x._uU(6,"\n"),x.YNc(7,en,3,3,"app-callout",1),x._uU(8,"\n"),x.TgZ(9,"form",2,3),x.NdJ("ngSubmit",(function(){return t.submit()})),x._uU(11,"\n  "),x.TgZ(12,"bit-form-field",4),x._uU(13,"\n    "),x.TgZ(14,"bit-label",5),x._uU(15),x.ALo(16,"i18n"),x.qZA(),x._uU(17,"\n    "),x.TgZ(18,"bit-select",6),x.NdJ("ngModelChange",(function(n){return t.format=n})),x._uU(19,"\n      "),x.YNc(20,on,1,2,"bit-option",7),x._uU(21,"\n      "),x.YNc(22,rn,6,1,"ng-container",8),x._uU(23,"\n    "),x.qZA(),x._uU(24,"\n  "),x.qZA(),x._uU(25,"\n  "),x.YNc(26,st,109,54,"app-callout",9),x._uU(27,"\n  "),x.TgZ(28,"div",10),x._uU(29,"\n    "),x.TgZ(30,"div",11),x._uU(31,"\n      "),x.TgZ(32,"div",12),x._uU(33,"\n        "),x.TgZ(34,"label",13),x._uU(35),x.ALo(36,"i18n"),x.qZA(),x._uU(37,"\n        "),x._UZ(38,"br"),x._uU(39,"\n        "),x.TgZ(40,"div",14),x._uU(41,"\n          "),x.TgZ(42,"button",15),x.NdJ("click",(function(){x.CHM(n);const t=x.MAs(49);return x.KtG(t.click())})),x._uU(43),x.ALo(44,"i18n"),x.qZA(),x._uU(45),x.ALo(46,"i18n"),x.qZA(),x._uU(47,"\n        "),x.TgZ(48,"input",16,17),x.NdJ("change",(function(n){return t.setSelectedFile(n)})),x.qZA(),x._uU(50,"\n      "),x.qZA(),x._uU(51,"\n    "),x.qZA(),x._uU(52,"\n  "),x.qZA(),x._uU(53,"\n  "),x.TgZ(54,"div",12),x._uU(55,"\n    "),x.TgZ(56,"label",18),x._uU(57),x.ALo(58,"i18n"),x.qZA(),x._uU(59,"\n    "),x.TgZ(60,"textarea",19),x.NdJ("ngModelChange",(function(n){return t.fileContents=n})),x.qZA(),x._uU(61,"\n  "),x.qZA(),x._uU(62,"\n  "),x.TgZ(63,"button",20),x._uU(64,"\n    "),x._UZ(65,"i",21),x.ALo(66,"i18n"),x._uU(67,"\n    "),x.TgZ(68,"span"),x._uU(69),x.ALo(70,"i18n"),x.qZA(),x._uU(71,"\n  "),x.qZA(),x._uU(72,"\n"),x.qZA(),x._uU(73,"\n")}2&n&&(x.xp6(3),x.Oqu(x.lcZ(4,20,"importData")),x.xp6(4),x.Q6J("ngIf",t.importBlockedByPolicy),x.xp6(8),x.hij("1. ",x.lcZ(16,22,"selectFormat"),""),x.xp6(3),x.Q6J("ngModel",t.format)("disabled",t.importBlockedByPolicy),x.xp6(2),x.Q6J("ngForOf",t.featuredImportOptions),x.xp6(2),x.Q6J("ngIf",t.importOptions&&t.importOptions.length),x.xp6(4),x.Q6J("ngIf",t.format),x.xp6(9),x.hij("2. ",x.lcZ(36,24,"selectImportFile"),""),x.xp6(7),x.Q6J("disabled",t.importBlockedByPolicy),x.xp6(1),x.hij("\n            ",x.lcZ(44,26,"chooseFile"),"\n          "),x.xp6(2),x.hij("\n          ",t.fileSelected?t.fileSelected.name:x.lcZ(46,28,"noFileChosen"),"\n        "),x.xp6(3),x.Q6J("disabled",t.importBlockedByPolicy),x.xp6(9),x.Oqu(x.lcZ(58,30,"orCopyPasteFileContents")),x.xp6(3),x.Q6J("ngModel",t.fileContents)("disabled",t.importBlockedByPolicy),x.xp6(3),x.Q6J("disabled",t.loading||t.importBlockedByPolicy)("ngClass",x.VKq(36,ct,t.importBlockedByPolicy)),x.xp6(2),x.s9C("title",x.lcZ(66,32,"loading")),x.xp6(4),x.Oqu(x.lcZ(70,34,"importData")))},dependencies:[Z.mk,Z.sg,Z.O5,k.Fj,k.JJ,k.JL,k.Q7,k.On,k.F,A.O,E.d,T.u,W.H,nn.x,q.C],encapsulation:2});const lt=[{path:"import",component:pt,canActivate:[d.G],data:{titleId:"importData",organizationPermissions:n=>n.canAccessImportExport}},{path:"export",component:D,canActivate:[d.G],data:{titleId:"exportVault",organizationPermissions:n=>n.canAccessImportExport}}];class ut{}ut.ɵfac=function(n){return new(n||ut)},ut.ɵmod=x.oAB({type:ut}),ut.ɵinj=x.cJS({imports:[u.Bz.forChild(lt)]});class dt{}dt.ɵfac=function(n){return new(n||dt)},dt.ɵmod=x.oAB({type:dt}),dt.ɵinj=x.cJS({providers:[{provide:p.rZ,useClass:p.gO,deps:[o.s]},{provide:p.wF,useClass:p.Y5,deps:[r.u,c.s,p.rZ,a.D,s.a,i.$]}],imports:[l.m,l.f,ut]})}}]);
//# sourceMappingURL=920.45633aa1d8e33d29ae50.js.map