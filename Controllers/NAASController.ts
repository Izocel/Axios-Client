import { Controller } from "./Controller";
import { NAASApi, NopeData } from "../Apis/NAASApi";

export class NAASController extends Controller<NAASApi> {
    protected static instance: NAASController;

    public static async GetNope<T = NopeData>() {
        const { call, controller, config } = NAASApi.GetNope<T>();

        // To demonstrate aborting the request (optional)
        setTimeout(() => {
            controller?.abort();
            console.log("Request aborted");
        }, 10_000);


        const response = await call();
        return response.data || { reason: "No reason provided" };
    }
}