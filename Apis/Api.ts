import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
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

    private static get self() {
        return this.GetInstance();
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

    public static Get<T = any>(url: string, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => this.self.axios.get<T>(url, finalConfig), controller, config: finalConfig };
    }

    public static Post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => this.self.axios.post<T>(url, data, finalConfig), controller, config: finalConfig };
    }

    public static Put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => this.self.axios.put<T>(url, data, finalConfig), controller, config: finalConfig };
    }

    public static Delete<T = any>(url: string, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => this.self.axios.delete<T>(url, finalConfig), controller, config: finalConfig };
    }

    public static Patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const { controller, config: finalConfig } = this.ParseConfig(config);
        return { call: () => this.self.axios.patch<T>(url, data, finalConfig), controller, config: finalConfig };
    }
}