import ProfileName from '@components/ProfileName'
import { Meta, Story } from '@storybook/react'
import {
  Dropdown,
  DropdownItem,
  DropdownProps,
  DropdownItemProps,
} from './index'

type DropdownStoriesProp = Omit<DropdownProps, 'children'> & DropdownItemProps

const stories: Meta<DropdownStoriesProp> = {
  component: Dropdown,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
    handleClick: {
      table: {
        disable: true,
      }
    },
  },
}

export default stories

export const Template: Story = () => {
  return (
    <Dropdown trigger={<ProfileName size={4} name="João" />}>
      <DropdownItem href="/profile" label="Profiles" />
      <DropdownItem href="/signout" label="Sign out" />
    </Dropdown>
  )
}
