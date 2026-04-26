import { Api } from "../Apis/Api";

export class Controller<T extends Api> {
    protected static instance: Controller<any>;

    constructor() {
        console.log(`${this.constructor.name} controller initialized`);
    }

    public static GetInstance<T extends Controller<any>>(this: new () => T): T {
        if (!(this as any).instance) {
            (this as any).instance = new this();
        }
        return (this as any).instance;
    }

}