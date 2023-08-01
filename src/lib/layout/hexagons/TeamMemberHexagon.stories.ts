import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import TeamMemberHexagon from './TeamMemberHexagon.svelte';

export default {
  title: 'Atoms/Hexagons/Team Member Hexagon',
  component: TeamMemberHexagon,
  parameters: {
    layout: 'centered'
  }
};

export const CustomIconHexagon = {
  args: {
    teamMember: {
      name: 'Bruno Rosendo',
      role: 'Co-Gestor de Projetos',
      photoPath: 'images/previews/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [
        { iconPath: 'images/previews/facebook.png', url: 'https://www.facebook.com/' }
      ]
    }
  }
};

export const HoveredCustomIconHexagon = {
  args: {
    teamMember: {
      name: 'Bruno Rosendo',
      role: 'Co-Gestor de Projetos',
      photoPath: 'images/previews/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [
        { iconPath: 'images/previews/facebook.png', url: 'https://www.facebook.com/' }
      ]
    }
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const DefaultIconHexagon = {
  args: {
    teamMember: {
      name: 'Bruno Rosendo',
      role: 'Co-Gestor de Projetos',
      photoPath: 'images/previews/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [{ url: 'https://www.facebook.com/' }]
    }
  }
};

export const HoveredDefaultIconHexagon = {
  args: {
    teamMember: {
      name: 'Bruno Rosendo',
      role: 'Co-Gestor de Projetos',
      photoPath: 'images/previews/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [{ url: 'https://www.facebook.com/' }]
    }
  },
  parameters: {
    pseudo: { hover: true }
  }
};
