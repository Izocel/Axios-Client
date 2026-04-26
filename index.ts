import { NAASApi, NopeData } from "./NAASApi";

async function main() {
    NAASApi.GetInstance();

    const { call, controller } = NAASApi.GetNope();

    // To demonstrate aborting the request (optional)
    setTimeout(() => {
        controller?.abort();
        console.log("Request aborted");
    }, 10_000);

    try {
        const resp = await call;
        const data: NopeData = resp.data || { reason: "No reason provided" };
        console.log("API call successful:", data.reason);
    } catch (error) {
        switch ((error as any).name) {
            case "CanceledError":
                console.warn("Request was canceled");
                break;
            default:
                console.error("Error during API call:", error);
                break;
        }
    }
}

main();


