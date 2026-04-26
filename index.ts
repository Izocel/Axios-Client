import { NAASController } from "./Controllers/NAASController";

async function main() {
    try {
        const data = await NAASController.GetNope();
        console.log("Received data:", data);
    } catch (error) {
        switch ((error as any).name) {
            case "CanceledError":
                console.warn("Request was canceled");
                break;
            default:
                throw error;
        }
    }
}

main();


