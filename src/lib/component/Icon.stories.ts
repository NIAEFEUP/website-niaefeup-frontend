import Icon from './Icon.svelte';
import Icons from './Icons';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'text' }
  },
  parameters: {
    layout: 'centered',
    controls: { exclude: ['src'] }
  }
};

export const TwitterIcon = {
  args: {
    src: Icons.Twitter,
    color: 'white',
    size: '50px'
  }
};

export const InstagramIcon = {
  args: {
    src: Icons.Instagram,
    color: 'white',
    size: '50px'
  }
};

export const FacebookIcon = {
  args: {
    src: Icons.Facebook,
    color: 'white',
    size: '50px'
  }
};

export const GithubIcon = {
  args: {
    src: Icons.Github,
    color: 'white',
    size: '50px'
  }
};

export const MailIcon = {
  args: {
    src: Icons.Mail,
    color: 'white',
    size: '50px'
  }
};

export const LinkedinIcon = {
  args: {
    src: Icons.Linkedin,
    color: 'white',
    size: '50px'
  }
};

export const UserIcon = {
  args: {
    src: Icons.User,
    color: 'white',
    size: '50px'
  }
};

export const BarsIcon = {
  args: {
    src: Icons.Bars,
    color: 'white',
    size: '50px'
  }
};

export const TimesIcon = {
  args: {
    src: Icons.Times,
    color: 'white',
    size: '50px'
  }
};
