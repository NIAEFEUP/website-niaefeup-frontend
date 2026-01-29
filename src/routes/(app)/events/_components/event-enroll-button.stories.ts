import EventEnrollButton from './event-enroll-button.svelte';

export default {
  title: 'Atoms/Buttons/Event Enroll Button',
  component: EventEnrollButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    registerUrl: { control: 'text' }
  }
};

export const Default = {
  render: (args) => ({
    Component: EventEnrollButton,
    props: args
  }),
  args: {
    label: 'INSCREVER',
    registerUrl: 'https://www.google.com/intl/pt-PT/forms/about/',
    disabled: false
  }
};

export const Disabled = {
  render: (args) => ({
    Component: EventEnrollButton,
    props: args
  }),
  args: {
    label: 'ESGOTADO',
    registerUrl: 'https://www.google.com/intl/pt-PT/forms/about/',
    disabled: true
  }
};

export const NoRegisterUrl = {
  render: (args) => ({
    Component: EventEnrollButton,
    props: args
  }),
  args: {
    label: 'EM BREVE',
    registerUrl: '',
    disabled: false
  }
};
