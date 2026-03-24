import MemberButton from './member-button.svelte';

export default {
  title: 'Atoms/Buttons/Member Button',
  component: MemberButton,
  argTypes: {
    userId: {
      control: 'text',
      description: 'User ID for logged-in state, or null/undefined for logged-out state'
    }
  },
  parameters: {
    layout: 'centered'
  }
};

export const LoggedOut = {
  args: {
    userId: null
  }
};

export const LoggedInWithNumericId = {
  args: {
    userId: 123
  }
};

export const LoggedInWithStringId = {
  args: {
    userId: 'john-doe'
  }
};

export const MemberArea = {
  args: {
    userId: null
  }
};
