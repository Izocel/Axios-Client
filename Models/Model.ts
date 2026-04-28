import z from "zod";

export function createZodIssue(exception: any | unknown): z.core.$ZodIssue {
  return {
    path: [],
    code: "custom",
    message: `Exception: ${exception.message || exception.toString()}`,
  };
}

export abstract class Model<T extends z.ZodSchema> {
  protected readonly schema: T;
  protected _isValid: boolean = false;
  protected _errors?: z.core.$ZodIssue[];

  constructor(schema: T, data: any = {}, enforce?: boolean) {
    this.schema = schema;
    this.validate(data);
    enforce ? this.enforce(data) : this.validate(data);
  }

  get isValid(): boolean {
    return this._isValid;
  }

  set isValid(isValid: boolean) {
    this._isValid = isValid;
  }

  get errors(): z.core.$ZodIssue[] | undefined {
    return this._errors;
  }

  set errors(errors: z.core.$ZodIssue[] | undefined) {
    this._errors = errors;
  }

  /**
   * Validate the model against its schema and update the isValid and errors properties accordingly. This method can be called after modifying the model's properties to re-validate it.
   */
  public validate(data: any = this) {
    try {
      const results = this.schema.safeParse(data);
      this._isValid = results.success === true;
      this._errors = results.error?.issues;
    } catch (error) {
      this._errors = [createZodIssue(error)];
      this._isValid = false;
    }

    return this;
  }

  /**
   * Enforce validation and throw an error if the model is not valid. This is useful for ensuring that a model is valid before using it in an API call or other operation.
   * The error message will include the validation errors for easier debugging.
   */
  public enforce(data: any = this) {
    this.validate(data);

    if (!this.isValid) {
      throw new Error("Model validation failed. See console for details.");
    }

    return this;
  }
}
