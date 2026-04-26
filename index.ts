import { NAASApi, NopeData } from "./NAASApi";

async function main() {

    try {
        NAASApi.GetInstance();

        const { response, controller } = NAASApi.GetNope();

        // To demonstrate aborting the request (optional)
        setTimeout(() => {
            controller?.abort();
            console.log("Request aborted");
        }, 10_000);


        const resp = await response;
        const data: NopeData = resp.data || { reason: "No reason provided" };
        console.log("API response successful:", data.reason);
    } catch (error) {
        switch ((error as any).name) {
            case "CanceledError":
                console.warn("Request was canceled");
                break;
            default:
                console.error(error);
                break;
        }
    }
}

main();


