import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import TeamMemberHexagon from './TeamMemberHexagon.svelte';

export default {
  title: 'Atoms/Hexagons/TeamMemberHexagon',
  component: TeamMemberHexagon,
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
      photoPath: 'images/previews/bruno-rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      customWebsites: [{ iconPath: 'images/previews/facebook.png', url: 'https://www.facebook.com/' }]
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Hover over hexagon', async () => {
      await userEvent.hover(await canvas.findByTestId('hexagon'));
      const role = canvas.queryByText('Co-Gestor de Projetos');
      await expect(role).toBeTruthy();
    });
  }
};
