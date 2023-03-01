import { Meta } from '@storybook/react'
import { ProfileHeader, type ProfileHeaderProps } from './index'

const stories: Meta<ProfileHeaderProps> = {
  component: ProfileHeader,
}

export default stories

export const Default = () => (
  <ProfileHeader
    name="João Oliveira"
    description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
  />
)