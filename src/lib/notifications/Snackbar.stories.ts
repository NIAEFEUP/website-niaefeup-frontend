import { Notification } from ".";
import Snackbar from "./Snackbar.svelte";

export default {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  argTypes: {
    notification: { control: 'object' },
  },
  parameters: {
    layout: 'centered'
  }
};

export const ShortNotification = {
  args: {
    notification: new Notification('This is a short notification')
  }
};

export const LongNotification = {
  args: {
    notification: new Notification('This is a long notification that wraps in multiple lines. Do you like it? ;)')
  }
};
