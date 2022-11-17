import { Button, ErrorMessage, Input } from '@/components'
import { useFormik } from 'formik'
import { useAuth } from '@/context'
import {
  Title,
  Text,
  ChangeFormBtn,
  Wrapper,
} from '@/components/Form/SignInModal/styles'
import { isSome, none, fromNullable, chain, getLeft } from 'fp-ts/Option'
import * as Yup from 'yup'
import { pipe } from 'fp-ts/lib/function'

type SignInProps = {
  onSwitchFormClick: (state: boolean) => void
}

export type SignInValues = {
  email: string
  password: string
}

const signInSchema = Yup.object({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('Email field is required')
    .lowercase(),
  password: Yup.string()
    .required('Password field is required')
    .min(8, 'Minimum 8 characters required!')
    .max(64, 'Maximum 64 characters required!'),
})

const SignIn = ({ onSwitchFormClick }: SignInProps) => {
  const { signIn, isLoading, data, error: genericError } = useAuth()

  const initialValues: SignInValues = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: (values: SignInValues) => handleSubmit(values),
  })

  const handleSubmit = (values: SignInValues) => {
    const newSignInValues = {
      user: values,
    }
    signIn(newSignInValues)
  }

  const dataError = pipe(
    data,
    fromNullable,
    chain((data) => isSome(data) ? getLeft(data.value) : none)
  )

  const handleError = () => {
    if(isSome(genericError)) return genericError
    else if (isSome(dataError)) return dataError
    else return none
  }

  const errorObj  = handleError()
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Sign in</Title>
      <Input
        type="text"
        placeholder="Email"
        name="email"
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        touched={formik.touched.email}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        onChange={formik.handleChange}
        errorMessage={formik.errors.password}
        touched={formik.touched.password}
        onBlur={formik.handleBlur}
      />
      <Button
        type="submit"
        size="large"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
      {isSome(errorObj) && (
        <ErrorMessage errorMessage={errorObj.value.message} />
      )}
      <Text>
        Don&apos;t have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => onSwitchFormClick(false)}>
          Sign up
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}

export { SignIn }
