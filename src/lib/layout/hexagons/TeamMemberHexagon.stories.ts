import TeamMemberHexagon from './TeamMemberHexagon.svelte';

export default {
  title: 'Atoms/Hexagons/TeamMemberHexagon',
  component: TeamMemberHexagon,
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  parameters: {
    layout: 'centered',
    controls: { exclude: ['teamMember'] }
  }
};

export const TeamHexagon = {
  args: {
    teamMember: {
      name: 'Bruno Rosendo',
      role: 'Co-Gestor de Projetos',
      photoPath: 'images/tests/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [{ iconPath: 'images/tests/facebook.png', url: 'https://www.facebook.com/' }]
    }
  }
};
