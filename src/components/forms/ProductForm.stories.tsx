import { Meta, StoryObj } from "@storybook/react";
import ProductForm from "./ProductForm";

const meta: Meta<typeof ProductForm> = {
  component: ProductForm,
  title: 'Organisms/ProductForm',
}

export default meta

type Story = StoryObj<typeof ProductForm>

export const Default: Story = {}