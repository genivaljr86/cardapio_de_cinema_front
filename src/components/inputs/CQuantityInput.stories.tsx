import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from "@storybook/react";
import CQuantityInput from "./CQuantityInput";

const meta: Meta<typeof CQuantityInput> = {
  component: CQuantityInput,
  title: 'Atomos/CQuantityInput',
  excludeStories: /.*Data$/,
  argTypes: { handleOnChange: { action: 'handleOnChange' } }
}

export default meta

type Story = StoryObj<typeof CQuantityInput>

export const CQuantityActionsData = {
  handleOnChange: action('handleOnChange')
}

export const Default: Story = {}