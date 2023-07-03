import { Meta, StoryObj } from "@storybook/react";
import CProductLabel from "./CProductLabel";
import imageFile from "../resources/img/Jurassic_Park_logo.png"

const meta: Meta<typeof CProductLabel> = {
  component: CProductLabel,
  title: 'Organisms/CProductLabel'
}

export default meta

type Story = StoryObj<typeof CProductLabel>

export const Default: Story = {
  args: {
    photo: imageFile,
    name: 'Product Name'
  }
}

export const NoImage: Story = {
  args: {
    photo: undefined,
    name: 'Product Name'
  }
}