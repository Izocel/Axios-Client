import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
    call: Promise<AxiosResponse<T>>;
    controller?: AbortController;
}

export class Api {
    protected static instance: Api;
    protected axios: AxiosInstance;
    protected defaults: AxiosRequestConfig<any> = {};

    constructor(config?: AxiosRequestConfig<any>) {
        this.axios = axios.create(config);
        this.defaults = { ...this.defaults, ...config };
        console.log(`${this.constructor.name} API initialized`);
    }

    public static GetInstance<T extends Api>(this: new () => T): T {
        if (!(this as any).instance) {
            (this as any).instance = new this();
        }
        return (this as any).instance;
    }

    public static Get<T = any>(url: string, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const self = this.GetInstance();
        const controller = new AbortController();
        config = config || {};
        config.signal = controller.signal;
        return { call: self.axios.get<T>(url, config), controller };
    }

    public static Post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const self = this.GetInstance();
        const controller = new AbortController();
        config = config || {};
        config.signal = controller.signal;
        return { call: self.axios.post<T>(url, data, config), controller };

    }

    public static Put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const self = this.GetInstance();
        const controller = new AbortController();
        config = config || {};
        config.signal = controller.signal;
        return { call: self.axios.put<T>(url, data, config), controller };
    }

    public static Delete<T = any>(url: string, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const self = this.GetInstance();
        const controller = new AbortController();
        config = config || {};
        config.signal = controller.signal;
        return { call: self.axios.delete<T>(url, config), controller };
    }

    public static Patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>): ApiResponse<T> {
        const self = this.GetInstance();
        const controller = new AbortController();
        config = config || {};
        config.signal = controller.signal;
        return { call: self.axios.patch<T>(url, data, config), controller };
    }
}