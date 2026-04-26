import { Api } from "../Apis/Api";

export class Controller<T extends Api> {
  protected static instance: Controller<Api>;

  constructor() {
    console.log(`${this.constructor.name} controller initialized`);
  }

  public static GetInstance<T extends Controller<any>>(
    this: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (!(this as any).instance) {
      (this as any).instance = new this(...args);
    }
    return (this as any).instance;
  }
}
