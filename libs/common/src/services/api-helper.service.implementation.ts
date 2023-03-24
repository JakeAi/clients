import { ApiHelperService as ApiHelperService } from "../abstractions/api-helper.service.abstraction";
import { EnvironmentService } from "../abstractions/environment.service";
import { PlatformUtilsService } from "../abstractions/platformUtils.service";
import { DeviceType } from "../enums/deviceType";
import { Utils } from "../misc/utils";
import { ErrorResponse } from "../models/response/error.response";

// TODO: consider creating folder in services called api-communication?
// caveat: it requires updating all references to the api service abstraction & implementation

/**
 * API Helper Service which provides common functionality for API services
 * like http request creation and error handling with no auth knowledge.
 */
export class ApiHelperServiceImplementation implements ApiHelperService {
  private device: DeviceType;
  private deviceType: string;
  private isWebClient = false;

  constructor(
    private platformUtilsService: PlatformUtilsService,
    private environmentService: EnvironmentService,
    private customUserAgent: string
  ) {
    this.device = platformUtilsService.getDevice();
    this.deviceType = this.device.toString();
    this.isWebClient =
      this.device === DeviceType.IEBrowser ||
      this.device === DeviceType.ChromeBrowser ||
      this.device === DeviceType.EdgeBrowser ||
      this.device === DeviceType.FirefoxBrowser ||
      this.device === DeviceType.OperaBrowser ||
      this.device === DeviceType.SafariBrowser ||
      this.device === DeviceType.UnknownBrowser ||
      this.device === DeviceType.VivaldiBrowser;
  }

  //#region Http Request Creation

  buildRequestUrl(path: string, apiUrl?: string): string {
    apiUrl = Utils.isNullOrWhitespace(apiUrl || "") ? this.environmentService.getApiUrl() : apiUrl;

    // Prevent directory traversal from malicious paths
    const pathParts = path.split("?");
    const requestUrl =
      apiUrl + Utils.normalizePath(pathParts[0]) + (pathParts.length > 1 ? `?${pathParts[1]}` : "");

    return requestUrl;
  }

  /**
   * Creates a bitwarden request object with appropriate headers based on method inputs.
   *
   * Useful for API services that cannot use `send(...)` because they require custom
   * response handling
   * @param method - GET, POST, PUT, DELETE
   * @param requestUrl - url to send request to
   * @param body - body of request
   * @param hasResponse - whether or not to expect a response
   * @param alterHeaders - function to alter headers before sending request
   * @returns Request object
   */
  async createRequest(
    method: "GET" | "POST" | "PUT" | "DELETE",
    requestUrl: string,
    body: any,
    hasResponse: boolean,
    alterHeaders?: (headers: Headers) => Promise<void> | void
  ): Promise<Request> {
    const headers = new Headers({
      "Device-Type": this.deviceType,
    });
    if (this.customUserAgent != null) {
      headers.set("User-Agent", this.customUserAgent);
    }

    const requestInit: RequestInit = {
      cache: "no-store",
      credentials: this.getCredentials(),
      method: method,
    };

    if (body != null) {
      if (typeof body === "string") {
        requestInit.body = body;
        headers.set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
      } else if (typeof body === "object") {
        if (body instanceof FormData) {
          requestInit.body = body;
        } else {
          headers.set("Content-Type", "application/json; charset=utf-8");
          requestInit.body = JSON.stringify(body);
        }
      }
    }
    if (hasResponse) {
      headers.set("Accept", "application/json");
    }
    if (alterHeaders != null) {
      await alterHeaders(headers);
    }

    requestInit.headers = headers;

    return new Request(requestUrl, requestInit);
  }

  //#endregion Http Request Creation

  //#region Http Request Execution Methods

  async fetch(request: Request): Promise<Response> {
    if (request.method === "GET") {
      request.headers.set("Cache-Control", "no-store");
      request.headers.set("Pragma", "no-cache");
    }
    request.headers.set("Bitwarden-Client-Name", this.platformUtilsService.getClientType());
    request.headers.set(
      "Bitwarden-Client-Version",
      await this.platformUtilsService.getApplicationVersionNumber()
    );
    return this.nativeFetch(request);
  }

  nativeFetch(request: Request): Promise<Response> {
    return fetch(request);
  }

  //#endregion Http Request Execution Methods

  //#region Http Response Handling Methods

  async handleUnauthedError(
    errorResponse: Response,
    tokenError: boolean
  ): Promise<ErrorResponse | null> {
    const errorResponseJson = await this.getErrorResponseJson(errorResponse);
    return this.buildErrorResponse(errorResponseJson, errorResponse.status, tokenError);
  }

  async getErrorResponseJson(errorResponse: Response): Promise<any> {
    if (this.isJsonResponse(errorResponse)) {
      return await errorResponse.json();
    } else if (this.isTextResponse(errorResponse)) {
      return { Message: await errorResponse.text() };
    }
  }

  buildErrorResponse(
    errorResponseJson: any,
    responseStatus: number,
    tokenError: boolean
  ): ErrorResponse {
    return new ErrorResponse(errorResponseJson, responseStatus, tokenError);
  }

  //#endregion Http Response Handling Methods

  //#region Utility methods
  qsStringify(params: any): string {
    return Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");
  }

  isJsonResponse(response: Response): boolean {
    const typeHeader = response.headers.get("content-type");
    return typeHeader != null && typeHeader.indexOf("application/json") > -1;
  }

  private isTextResponse(response: Response): boolean {
    const typeHeader = response.headers.get("content-type");
    return typeHeader != null && typeHeader.indexOf("text") > -1;
  }

  private getCredentials(): RequestCredentials | undefined {
    if (!this.isWebClient || this.environmentService.hasBaseUrl()) {
      return "include";
    }
    return undefined;
  }

  //#endregion Utility methods
}
