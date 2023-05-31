import { Meta, StoryObj } from "@storybook/react";
import ClientForm from "./ClientForm";

const meta: Meta<typeof ClientForm> = {
  component: ClientForm,
  title: 'Organisms/ClientForm',
}

export default meta

type Story = StoryObj<typeof ClientForm>

export const Default: Story = {}