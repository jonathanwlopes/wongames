import { Story, Meta } from '@storybook/react'
import { AddShoppingCart } from '@styled-icons/material/AddShoppingCart'
import Button from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string'
    },
    icon: {
      type: 'symbol'
    }
  }
} as Meta

export const Default: Story = (args) => <Button {...args} />

Default.args = {
  children: 'Buy now'
}

export const withIcon: Story = (args) => <Button {...args} />

withIcon.args = {
  children: 'Buy now',
  size: 'small',
  icon: <AddShoppingCart />
}

export const asLink: Story = (args) => <Button {...args} />

asLink.args = {
  children: 'Buy now',
  size: 'large',
  as: 'a',
  href: '/link'
}
