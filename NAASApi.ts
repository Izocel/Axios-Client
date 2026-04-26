import { AxiosRequestConfig } from "axios";
import { Api } from "./Api";

export interface NopeData {
    reason: string;
}

//https://github.com/hotheadhacker/no-as-a-service
export class NAASApi extends Api {
    protected defaults = {
        baseURL: "https://no-as-a-service.com/api/v1/",
    };

    constructor(config?: AxiosRequestConfig<any>) {
        super(config);
    }

    public static GetNope<T = NopeData>() {
        return this.Get<T>("no");
    }
}