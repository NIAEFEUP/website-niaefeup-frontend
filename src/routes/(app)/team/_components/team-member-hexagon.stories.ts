import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import TeamMemberHexagon from './team-member-hexagon.svelte';

export default {
  title: 'Atoms/Hexagons/Team Member Hexagon',
  component: TeamMemberHexagon,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['orientation', 'teamMember'] }
  }
};

export const MobileHexagon = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Hexagon', async () => {
      const container = await canvas.findByTestId('container');
      const role = await canvas.findByTestId('role');
      await fireEvent.touchStart(container);
      await expect(role).toHaveAttribute('style', 'opacity: 1;');
    });

    await step('Close Hexagon', async () => {
      const container = await canvas.findByTestId('container');
      const role = await canvas.findByTestId('role');
      await fireEvent.touchStart(container);
      await expect(role).toHaveAttribute('style', 'opacity: 0;');
    });
  }
};

export const CustomIconHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ iconPath: 'images/previews/facebook.png', url: 'https://www.facebook.com/' }]
    }
  }
};

export const HoveredCustomIconHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ iconPath: 'images/previews/facebook.png', url: 'https://www.facebook.com/' }]
    }
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const DefaultIconHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  }
};

export const HoveredDefaultIconHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const DefaultProfilePicHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  }
};

export const HoveredDefaultProfilePicHexagon = {
  args: {
    data: {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  },
  parameters: {
    pseudo: { hover: true }
  }
};
