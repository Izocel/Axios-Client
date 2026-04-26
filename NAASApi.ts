import { AxiosRequestConfig } from "axios";
import { Api } from "./Api";

export interface NopeData {
    reason: string;
}

//https://github.com/hotheadhacker/no-as-a-service
export class NAASApi extends Api {
    constructor() {
        super({ baseURL: "https://naas.isalman.dev/" });
    }

    public static GetNope<T = NopeData>() {
        return this.Get<T>("no");
    }
}