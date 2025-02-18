import SocialMediaIcon from './social-media-icon.svelte';
import Icons from '@/lib/components/icons/icons';

export default {
  title: 'Atoms/Icons/Social Media Icon',
  component: SocialMediaIcon,
  parameters: {
    layout: 'centered'
  }
};

export const GitHubIcon = {
  args: {
    url: 'github.com',
    social: 'GitHub',
    icon: Icons.Github,
    user: 'John Doo'
  }
};

export const LinkedinIcon = {
  args: {
    url: 'linkedin.com',
    social: 'LinkedIn',
    icon: Icons.Linkedin,
    user: 'John Doo'
  }
};

export const CustomWebsiteIcon1 = {
  args: {
    url: 'loremipsum.com',
    social: 'LoremIpsum',
    icon: Icons.Globe,
    user: 'John Doo'
  }
};

export const CustomWebsiteIcon2 = {
  args: {
    url: 'loremipsum.com',
    social: 'LoremIpsum',
    user: 'John Doo',
    iconPath: 'https://picsum.photos/640/480'
  }
};
