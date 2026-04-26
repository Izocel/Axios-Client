import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  controller?: AbortController;
  config: AxiosRequestConfig<any>;
  call: () => Promise<AxiosResponse<T>>;
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

  public static ParseConfig(
    config?: AxiosRequestConfig<any>,
    controller?: AbortController,
  ) {
    config = config || {};
    controller = controller || new AbortController();
    config.signal = controller.signal;
    return { controller, config } as any;
  }

  public static Get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): ApiResponse<T> {
    const { controller, config: finalConfig } = this.ParseConfig(config);
    const cvlient = this.selfAxios;
    return {
      call: async () => cvlient.get<T>(url, finalConfig),
      controller,
      config: finalConfig,
    };
  }

  public static Post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiResponse<T> {
    const { controller, config: finalConfig } = this.ParseConfig(config);
    return {
      call: async () => this.selfAxios.post<T>(url, data, finalConfig),
      controller,
      config: finalConfig,
    };
  }

  public static Put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiResponse<T> {
    const { controller, config: finalConfig } = this.ParseConfig(config);
    return {
      call: async () => this.selfAxios.put<T>(url, data, finalConfig),
      controller,
      config: finalConfig,
    };
  }

  public static Delete<T = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): ApiResponse<T> {
    const { controller, config: finalConfig } = this.ParseConfig(config);
    return {
      call: async () => this.selfAxios.delete<T>(url, finalConfig),
      controller,
      config: finalConfig,
    };
  }

  public static Patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): ApiResponse<T> {
    const { controller, config: finalConfig } = this.ParseConfig(config);
    return {
      call: async () => this.selfAxios.patch<T>(url, data, finalConfig),
      controller,
      config: finalConfig,
    };
  }
}
