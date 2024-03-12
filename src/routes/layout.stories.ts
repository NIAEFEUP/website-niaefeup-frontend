import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Layout from './+layout.svelte';
import LayoutDecorator from '$lib/storybook-utils/LayoutDecorator.svelte';
import NotificationMessages from '$lib/notifications/NotificationMessages';

export default {
  title: 'Organisms/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'transparent' }
  },
  decorators: [() => LayoutDecorator]
};

export const Default = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Copy email and check notification', async () => {
      await userEvent.click(await canvas.findByTestId('email-icon'));
      const notification = canvas.queryByText(NotificationMessages.COPY_EMAIL);
      await expect(notification).toBeTruthy();
    });

    await step('Close notification', async () => {
      const notification = canvas.queryByText(NotificationMessages.COPY_EMAIL);
      const closeButton = notification?.nextElementSibling?.firstElementChild;

      if (closeButton) await userEvent.click(closeButton);
      await waitForElementToBeRemoved(notification);

      const notificationAfterClose = canvas.queryByText(NotificationMessages.COPY_EMAIL);
      await expect(notificationAfterClose).toBeNull();
    });

    await step('Open 3 notifications', async () => {
      await userEvent.click(canvas.getByTestId('email-icon'));
      await userEvent.click(canvas.getByTestId('email-icon'));
      await userEvent.click(canvas.getByTestId('email-icon'));

      const notifications = canvas.getAllByText(NotificationMessages.COPY_EMAIL);
      await expect(notifications).toHaveLength(3);
    });

    await step('Open notification over the limit', async () => {
      await userEvent.click(canvas.getByTestId('email-icon'));

      await waitFor(async () => {
        const notifications = canvas.getAllByText(NotificationMessages.COPY_EMAIL);
        await expect(notifications).toHaveLength(3);
      });
    });

    await step('Close all notifications', async () => {
      const notifications = canvas.getAllByText(NotificationMessages.COPY_EMAIL);
      await notifications.forEach(async (notification) => {
        const closeButton = notification.nextElementSibling?.firstElementChild;

        if (closeButton) await userEvent.click(closeButton);
        await waitForElementToBeRemoved(notification);
      });

      await waitFor(async () => {
        const notificationsAfterClose = canvas.queryByText(NotificationMessages.COPY_EMAIL);
        await expect(notificationsAfterClose).toBeNull();
      });
    });
  }
};
