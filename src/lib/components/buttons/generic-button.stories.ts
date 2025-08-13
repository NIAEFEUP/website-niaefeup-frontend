import GenericButton from './generic-button.svelte';
import Icons from '$lib/components/icons/icons';

export default {
  title: 'Atoms/Buttons/Generic Button',
  component: GenericButton,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['type'] }
  }
};

export const SmallWithLink = {
  args: {
    size: 'small',
    link: 'https://lipsum.org',
    icon: Icons.Edit,
    ariaLabel: 'Edit'
  }
};

export const MediumWithLink = {
  args: {
    size: 'medium',
    link: 'https://lipsum.org',
    icon: Icons.Edit,
    ariaLabel: 'Edit'
  }
};

export const LargeWithLink = {
  args: {
    size: 'large',
    link: 'https://lipsum.org',
    icon: Icons.Edit,
    ariaLabel: 'Edit'
  }
};

export const ResponsiveWithLink = {
  args: {
    size: 'responsive',
    link: 'https://lipsum.org',
    icon: Icons.Edit,
    ariaLabel: 'Edit'
  }
};

export const SmallWithAction = {
  args: {
    size: 'small',
    icon: Icons.Logout,
    ariaLabel: 'Logout',
    onClick: () => alert('Logout clicked!')
  }
};

export const MediumWithAction = {
  args: {
    size: 'medium',
    icon: Icons.Logout,
    ariaLabel: 'Logout',
    onClick: () => alert('Logout clicked!')
  }
};

export const LargeWithAction = {
  args: {
    size: 'large',
    icon: Icons.Logout,
    ariaLabel: 'Logout',
    onClick: () => alert('Logout clicked!')
  }
};

export const ResponsiveWithAction = {
  args: {
    size: 'responsive',
    icon: Icons.Logout,
    ariaLabel: 'Logout',
    onClick: () => alert('Logout clicked!')
  }
};
