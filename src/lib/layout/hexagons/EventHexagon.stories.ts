import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import EventHexagon from './EventHexagon.svelte';

export default {
  title: 'Atoms/Hexagons/Event Hexagon',
  component: EventHexagon,
  parameters: {
    layout: 'centered',
    controls: {exclude: ['orientation', 'event']}
  }
};

export const DateIntervalHexagon = {
  args: {
    title: { control: 'text' },
    data: {
      title: 'Jantar de Curso',
      description: 'Muito fixe',
      teamMemberIds: [],
      registerUrl: 'https://www.google.com/intl/pt-PT/forms/about/',
      dateInterval: { startDate: new Date('2023-12-10'), endDate: new Date('2023-12-05') },
      location: 'Cervejaria Diu',
      thumbnailPath: 'images/previews/bruno_rosendo.png'
    }
  }
};

export const SingleDateHexagon = {
  args: {
    data: {
      title: 'Jantar de Curso',
      description: 'Muito fixe',
      teamMemberIds: [],
      registerUrl: 'https://www.google.com/intl/pt-PT/forms/about/',
      dateInterval: { startDate: new Date('2023-12-10') },
      location: 'Cervejaria Diu',
      thumbnailPath: 'images/previews/bruno_rosendo.png'
    }
  }
};