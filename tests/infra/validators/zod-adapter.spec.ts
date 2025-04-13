import { ZodAdapter } from '@/infra/validators'
import { z } from 'zod'

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
      literal: jest.fn(),
    },
  }
})

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

  it('should call z.literal with correct value', () => {
    const sut = ZodAdapter

    sut.field('any_field').literal(true).build()

    expect(z.literal).toHaveBeenCalledWith(true)
  })
})
