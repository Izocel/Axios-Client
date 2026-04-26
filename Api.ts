import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Apicall<T> {
    controller?: AbortController;
    config: AxiosRequestConfig<any>;
    call: () => Promise<AxiosResponse<T>>;
}

export class Api {
    protected static instance: Api;
    protected axios: AxiosInstance;

    constructor(config?: AxiosRequestConfig<any>) {
        this.axios = axios.create(config);
        console.log(`${this.constructor.name} API initialized`);
    }

    public static GetInstance<T extends Api>(this: new () => T): T {
        if (!(this as any).instance) {
            (this as any).instance = new this();
        }
        return (this as any).instance;
    }


    public static ParseConfig(config?: AxiosRequestConfig<any>, controller?: AbortController) {
        config = config || {};
        controller = controller || new AbortController();
        config.signal = controller.signal;
        return { controller, config } as any;
    }

    public static Get<T = any>(url: string, config?: AxiosRequestConfig<any>): Apicall<T> {
        const self = this.GetInstance();
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => self.axios.get<T>(url, finalConfig), controller, config: finalConfig };
    }

    public static Post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Apicall<T> {
        const self = this.GetInstance();
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => self.axios.post<T>(url, data, finalConfig), controller, config: finalConfig };
    }

    public static Put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Apicall<T> {
        const self = this.GetInstance();
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => self.axios.put<T>(url, data, finalConfig), controller, config: finalConfig };
    }

    public static Delete<T = any>(url: string, config?: AxiosRequestConfig<any>): Apicall<T> {
        const self = this.GetInstance();
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => self.axios.delete<T>(url, finalConfig), controller, config: finalConfig };
    }

    public static Patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): Apicall<T> {
        const self = this.GetInstance();
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => self.axios.patch<T>(url, data, finalConfig), controller, config: finalConfig };
    }
}