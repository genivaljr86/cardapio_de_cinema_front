import type { Preview } from "@storybook/react";
import { ConfigProvider, theme } from "antd";
import locale from 'antd/locale/pt_BR'
import React from "react";


const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={locale} theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          borderRadius: 0
        }
      }}>
        <Story />
      </ConfigProvider>
    )
  ]
};

export default preview;
