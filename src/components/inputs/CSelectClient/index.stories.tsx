import { Meta, StoryObj } from "@storybook/react"
import CSelectClient from "."
import { ClientResponseDataObject } from "../../../services/client"

const meta: Meta = {
  component: CSelectClient,
  title: 'Organisms/CSelectClient',
  excludeStories: /.*Data$/,
  argTypes: {
    onChangeClient: {
      action: 'onChangeClient'
    },
    onSelectClient: {
      action: 'onSelectClient'
    }
  }
}

export default meta

const clients: ClientResponseDataObject[] = [
  {
    "id": 22,
    "attributes": {
      "name": "Genival dos Santos Furtado Junior",
      "address": "José Aurino de Matos, 350. Apt 401",
      "createdAt": "2023-05-07T22:07:21.142Z",
      "updatedAt": "2023-05-31T21:23:41.536Z",
      "phone": "48988094074"
    }
  },
  {
    "id": 23,
    "attributes": {
      "name": "Afonso Reno",
      "address": "Izolete Franz, Palhoça",
      "createdAt": "2023-05-07T22:07:44.278Z",
      "updatedAt": "2023-05-08T16:01:49.382Z",
      "phone": "41256325846"
    }
  },
  {
    "id": 24,
    "attributes": {
      "name": "Anderson Coelho",
      "address": "Campeche",
      "createdAt": "2023-05-07T22:08:12.782Z",
      "updatedAt": "2023-05-07T22:21:29.577Z",
      "phone": "4178458455475"
    }
  },
  {
    "id": 25,
    "attributes": {
      "name": "Eddie Brock",
      "address": "Nova York",
      "createdAt": "2023-05-07T22:08:32.913Z",
      "updatedAt": "2023-05-07T22:21:37.915Z",
      "phone": "+15454845847878"
    }
  },
  {
    "id": 26,
    "attributes": {
      "name": "Carla Rejane",
      "address": "Itacorubi",
      "createdAt": "2023-05-18T21:16:51.758Z",
      "updatedAt": "2023-05-23T22:49:54.987Z",
      "phone": "878545251447"
    }
  },
  {
    "id": 27,
    "attributes": {
      "name": "Billy Batson",
      "address": "Filadélfia",
      "createdAt": "2023-05-26T14:32:37.030Z",
      "updatedAt": "2023-05-30T01:03:04.458Z",
      "phone": "145988809784563"
    }
  }
]

export const CSelectClientData = {
  clients
}

type Story = StoryObj<typeof CSelectClient>

export const Default: Story = {
  args: CSelectClientData
}

export const Loading: Story = {
  args: {
    loading: true,
    ...CSelectClientData
  }
}