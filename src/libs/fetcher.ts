import {
  handleFetcherErrors,
  UnknownError,
  DecodeError,
  AuthorizationError,
  AuthenticationError,
} from '@/libs'
import { parseCookies } from 'nookies'
import { type Either, left, right, isRight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { PathReporter } from 'io-ts/PathReporter'
import { baseApiUrl } from '@/types'
import * as t from 'io-ts'

const validationHandler = <A>(
  dataValidation: t.Validation<A>
): Either<DecodeError, A> => {
  if (isRight(dataValidation)) {
    return right(dataValidation.right)
  } else {
    const decodeErrors = PathReporter.report(dataValidation)
    return left(new DecodeError(decodeErrors.join(', ')))
  }
}

const validateCodec = <A>(
  codec: t.Type<A, unknown, unknown>,
  data: A
): Either<DecodeError, A> => pipe(data, codec.decode, validationHandler<A>)

type FetcherLeftErrors = AuthenticationError | DecodeError

export const fetcher = async <D, A>(
  path: string,
  codec: t.Type<A, unknown, unknown>,
  data?: D,
  customConfig?: RequestInit
): Promise<Either<FetcherLeftErrors, A>> => {
  try {
    const url = `${baseApiUrl}${path}`
    const { 'conduit.token': accessToken } = parseCookies()

    const headers: HeadersInit = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: accessToken,
    }

    const defaultMethod = 'GET'

    const config: RequestInit = {
      headers,
      method: defaultMethod,
      body: data ? JSON.stringify(data) : null,
      ...customConfig,
    }

    const response = await fetch(url, config)

    if (response.ok) {
      const result = await response.json()
      return validateCodec<A>(codec, result)
    }

    const responseError = await handleFetcherErrors(response)
    return left(responseError)
  } catch (error: unknown) {
    if (error instanceof AuthorizationError) throw new AuthorizationError()
    else throw new UnknownError()
  }
}
