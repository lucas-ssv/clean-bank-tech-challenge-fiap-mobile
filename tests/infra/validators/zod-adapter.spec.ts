import { z, ZodRawShape, ZodTypeAny } from 'zod'

jest.mock('zod', () => ({
  z: {
    object: jest.fn(),
    string: jest.fn(),
  },
}))

class ZodAdapter {
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
    this.validations[this.fieldName] = z.string({ message }) as ZodTypeAny
    return this
  }

  build() {
    return z.object(this.validations)
  }
}

describe('ZodAdapter', () => {
  it('should call z.string with correct message', () => {
    const sut = ZodAdapter

    sut.field('any_field').string('any_message_error').build()

    expect(z.string).toHaveBeenCalledWith({
      message: 'any_message_error',
    })
  })
})
