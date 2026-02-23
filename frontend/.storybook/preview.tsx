import type { Preview, Decorator } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { initialize, mswLoader } from "msw-storybook-addon";
import { store } from "../src/store/store";
import "../src/index.css";
import "../src/styles/theme.scss";

initialize();

document.body.classList.add("dark");

const withProviders: Decorator = (Story) => (
  <Provider store={store}>
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  </Provider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [withProviders],
  loaders: [mswLoader],
};

export default preview;
