import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiRequest<T> {
  controller: AbortController;
  config: AxiosRequestConfig<any>;
  call: (config?: AxiosRequestConfig<T>) => Promise<AxiosResponse<T>>;
}

export class Api {
  // Each subclass will have its own static Instance and Axios
  public static Instance: Api;
  public static Axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig<any>, AxiosInstance?: AxiosInstance) {
    // Use the constructor's class (not always Api) to set static properties
    const ctor = this.constructor as typeof Api;
    ctor.Axios = AxiosInstance || Axios.create(config);
    console.log(`${ctor.name} API initialized`);
  }

  public static get self() {
    return this.GetInstance();
  }

  public static get selfAxios() {
    this.GetInstance();
    return this.Axios;
  }

  public static GetInstance<T extends Api>(
    this: new (
      config?: AxiosRequestConfig<any>,
      AxiosInstance?: AxiosInstance,
    ) => T,
    config?: AxiosRequestConfig<any>,
    AxiosInstance?: AxiosInstance,
  ): T {
    if (!(this as any).Instance) {
      (this as any).Instance = new this(config, AxiosInstance);
    }
    return (this as any).Instance;
  }

  public static UpdateConfig(mutator: (config: AxiosRequestConfig) => void) {
    if (!this.Axios) {
      // Since we use UpdateConfig also in constructors
      // Use "super" first principle otherwise getting instance will cause infinite recursion
      throw new Error(
        "Axios instance not initialized. Call GetInstance() first.",
      );
    }

    mutator(this.Axios.defaults as AxiosRequestConfig);
  }

  public static PrepareRequest<T>(
    method: "get" | "post" | "put" | "delete" | "patch" = "get",
    url: string,
    config?: AxiosRequestConfig<any>,
    data?: T,
  ): ApiRequest<T> {
    const controller = new AbortController();
    config = {
      ...config,
      url,
      data,
      method,
      signal: controller.signal,
    };

    return {
      config,
      controller,
      call: async (c?: AxiosRequestConfig<T>) =>
        this.selfAxios.request<T>(c ?? config),
    };
  }

  public static Get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): ApiRequest<T> {
    return this.PrepareRequest<T>("get", url, config);
  }

  public static Post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiRequest<T> {
    return this.PrepareRequest<T>("post", url, config, data);
  }

  public static Put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiRequest<T> {
    return this.PrepareRequest<T>("put", url, config, data);
  }

  public static Delete<T = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): ApiRequest<T> {
    return this.PrepareRequest<T>("delete", url, config);
  }

  public static Patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiRequest<T> {
    return this.PrepareRequest<T>("patch", url, config, data);
  }
}
