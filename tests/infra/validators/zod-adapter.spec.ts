import { z, ZodRawShape, ZodString } from 'zod'

jest.mock('zod', () => {
  const emailMock = jest.fn()
  const minMock = jest.fn()
  const stringMock = jest.fn(() => ({
    email: emailMock,
    min: minMock,
  }))

  return {
    z: {
      object: jest.fn(),
      string: stringMock,
    },
  }
})

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

  it('should call z.string().email with correct message', () => {
    const sut = ZodAdapter

    sut
      .field('any_field')
      .string('any_message_error')
      .email('any_email_error')
      .build()

    expect(z.string().email).toHaveBeenCalledWith({
      message: 'any_email_error',
    })
  })

  it('should call z.string().min with correct message', () => {
    const sut = ZodAdapter

    sut
      .field('any_field')
      .string('any_message_error')
      .min(6, 'any_min_error')
      .build()

    expect(z.string().min).toHaveBeenCalledWith(6, { message: 'any_min_error' })
  })
})
