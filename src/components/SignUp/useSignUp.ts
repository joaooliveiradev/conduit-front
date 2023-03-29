import { UserTypeCodec } from '@/types'
import { DefaultError, fetcher } from '@/libs'
import { useMutation } from '@tanstack/react-query'
import { type Either } from 'fp-ts/Either'
import { useAuth } from '@/context'
import * as t from 'io-ts'

export type SignUpRequest = {
  user: {
    email: string
    password: string
  }
}

const SignUpResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignUpCodec = t.TypeOf<typeof SignUpResponseCodec>

export type SignUpResponseOutput = t.OutputOf<typeof SignUpResponseCodec>

export const signUpMutation = async (data: SignUpRequest) => {
  const options: RequestInit = {
    method: 'POST',
  }

  return await fetcher<SignUpRequest, SignUpCodec>(
    '/users',
    SignUpResponseCodec,
    data,
    options
  )
}

const USE_SIGN_UP_KEY = 'sign-up'

export const useSignUp = () => {
  const { handleLogin } = useAuth()

  return useMutation<
    Either<DefaultError, SignUpResponseOutput>,
    DefaultError,
    SignUpRequest
  >([USE_SIGN_UP_KEY], signUpMutation, {
    onSuccess: (response) => handleLogin(response),
  })
}