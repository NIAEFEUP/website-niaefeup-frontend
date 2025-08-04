import ProjectTile from './project-tile.svelte';
import type { Project } from '@/types/project';

export default {
  title: 'Pages/Project/ProjectTile',
  component: ProjectTile,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['orientation', 'event'] }
  }
};

const uni: Project = {
  title: 'uni',
  description:
    'Mobile app designed to help students of the University of Porto to manage their academic life.',
  teamMemberIds: [],
  slug: 'uni',
  image: 'images/previews/bruno_rosendo.png',
  gallery: [],
  thumbnail: 'images/previews/bruno_rosendo.png',
  isArchived: false,
  technologies: [],
  slogan: 'A FEUP no teu bolso.',
  targetAudience: 'students',
  github: 'https://github.com/NIAEFEUP/uni',
  links: [],
  hallOfFame: [],
  timeline: []
};

export const DesktopView = {
  args: {
    project: uni
  }
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    project: uni
  }
};
