import { z, ZodRawShape, ZodString } from 'zod'

export class ZodAdapter {
  private fieldName: string
  private validations: ZodRawShape

  private constructor(fieldName: string) {
    this.fieldName = fieldName
    this.validations = {}
  }

  static field(fieldName: string): ZodAdapter {
    return new ZodAdapter(fieldName)
  }

  string(message: string): ZodAdapter {
    this.validations[this.fieldName] = z.string({ message }) as ZodString
    return this
  }

  email(message: string): ZodAdapter {
    const current = this.validations[this.fieldName] as ZodString
    this.validations[this.fieldName] = current.email({ message })
    return this
  }

  min(minLength: number, message: string): ZodAdapter {
    const current = this.validations[this.fieldName] as any
    this.validations[this.fieldName] = current.min(minLength, { message })
    return this
  }

  literal(value: boolean): ZodAdapter {
    this.validations[this.fieldName] = z.literal<boolean>(value)
    return this
  }

  build() {
    return z.object(this.validations)
  }
}
