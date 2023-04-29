import Layout from './+layout.svelte';
import LayoutDecorator from '$lib/storybook-utils/LayoutDecorator.svelte';
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Organisms/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => LayoutDecorator]
};

export const Default = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Copy email and check notification", async () => {
      await userEvent.click(await canvas.findByTestId("email-icon"));
      const notification = canvas.queryByText("O email foi copiado para o teu clipboard :)");
      await expect(notification).toBeTruthy();
    });

    await step("Close notification", async () => {
      const notification = canvas.queryByText("O email foi copiado para o teu clipboard :)");
      const closeButton = notification?.nextElementSibling?.firstElementChild;

      if (closeButton)
        await userEvent.click(closeButton);
      await waitForElementToBeRemoved(notification);

      const notificationAfterClose = canvas.queryByText("O email foi copiado para o teu clipboard :)");
      await expect(notificationAfterClose).toBeNull();
    });

    await step("Open 3 notifications", async () => {
      await userEvent.click(canvas.getByTestId("email-icon"));
      await userEvent.click(canvas.getByTestId("email-icon"));
      await userEvent.click(canvas.getByTestId("email-icon"));

      const notifications = canvas.getAllByText("O email foi copiado para o teu clipboard :)");
      await expect(notifications).toHaveLength(3);
    });

    await step("Open notification over the limit", async () => {
      await userEvent.click(canvas.getByTestId("email-icon"));

      await waitFor(async () => {
        const notifications = canvas.getAllByText("O email foi copiado para o teu clipboard :)");
        await expect(notifications).toHaveLength(3);
      });
    });

    await step("Close all notifications", async () => {
      const notifications = canvas.getAllByText("O email foi copiado para o teu clipboard :)");
      await notifications.forEach(async (notification) => {
        const closeButton = notification.nextElementSibling?.firstElementChild;

        if (closeButton)
          await userEvent.click(closeButton);
        await waitForElementToBeRemoved(notification);
      });

      await waitFor(async () => {
        const notificationsAfterClose = canvas.queryByText("O email foi copiado para o teu clipboard :)");
        await expect(notificationsAfterClose).toBeNull();
      });
    });
  }
};
