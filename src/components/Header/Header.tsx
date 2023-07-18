import {
  Button,
  Anchor,
  type SignInModalProps,
  type DropdownProps,
  type DropdownItemProps,
  type ProfileNameProps,
  type DropdownTriggerProps,
  type DropdownContentProps,
  type DropdownListProps,
} from '@/components'
import { useAuth } from '@/context'
import { useState, useEffect } from 'react'
import { fromNullable, isSome, chain, getRight } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { useMe } from '@/hooks'
import logo from '@/assets/logo.webp'
import styled from 'styled-components'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const SignInModal = dynamic<SignInModalProps>(
  () =>
    import('@/components/SignInModal/SignInModal').then(
      (module) => module.SignInModal
    ),
  {
    ssr: false,
  }
)

const Dropdown = dynamic<DropdownProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then((module) => module.Dropdown),
  { ssr: false }
)

const DropdownTrigger = dynamic<DropdownTriggerProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then(
      (module) => module.DropdownTrigger
    ),
  {
    ssr: false,
  }
)

const DropdownContent = dynamic<DropdownContentProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then(
      (module) => module.DropdownContent
    ),
  {
    ssr: false,
  }
)

const DropdownList = dynamic<DropdownListProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then(
      (module) => module.DropdownList
    ),
  {
    ssr: false,
  }
)

const DropdownItem = dynamic<DropdownItemProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then(
      (module) => module.DropdownItem
    ),
  { ssr: false }
)

const ProfileName = dynamic<ProfileNameProps>(
  () =>
    import('@/components/ProfileName/ProfileName').then(
      (module) => module.ProfileName
    ),
  {
    ssr: false,
  }
)

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { signOut, status } = useAuth()
  const { data } = useMe()

  useEffect(() => {
    if (status === 'loggedIn') return setIsModalOpen(false)
  }, [status])

  const maybeData = pipe(data, fromNullable, chain(getRight))

  const showModal = () => setIsModalOpen(true)

  return (
    <Wrapper>
      <Anchor href="/">
        <Image src={logo} alt="Conduit Logo" width={172} height={42} />
      </Anchor>
      {isSome(maybeData) && status === 'loggedIn' ? (
        <Dropdown>
          <DropdownTrigger>
            <ProfileName size={2} name={maybeData.value.user.username} />
          </DropdownTrigger>
          <DropdownContent>
            <DropdownList>
              <DropdownItem
                label="Profile"
                href={`/profile/${maybeData.value.user.username}`}
              />
              <DropdownItem label="Sign Out" onEventClick={signOut} />
            </DropdownList>
          </DropdownContent>
        </Dropdown>
      ) : (
        <>
          <Button size="large" onClick={showModal}>
            Sign in
          </Button>
          <SignInModal
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
            showSignInFirst
          />
        </>
      )}
    </Wrapper>
  )
}
