import { error } from '@sveltejs/kit';

export async function load() {
  const event = {
    title: 'Jantar de Curso Informática',
    description: 'This was a nice and iconic event',
    teamMembers: [
      {
        name: 'Test Account',
        email: 'test_account@test.com',
        bio: 'This is a test account',
        birthDate: '28-07-2001',
        photo: 'https://test-photo.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        role: 'Eventoss',
        websites: [
          {
            url: 'https://test-website.com',
            iconPath: 'https://test-website.com/logo.png',
            label: 'test',
            id: 1
          }
        ],
        id: 1
      }
    ],
    slug: 'great-event',
    image: 'https://i.imgur.com/G4eBNi3.png',
    registerUrl: 'https://docs.google.com/forms',
    dateInterval: {
      startDate: '2022-07-28T14:30:00Z',
      endDate: '2022-07-30T16:30:00Z'
    },
    location: 'FEUP',
    category: 'Great Events',
    id: 1
  };

  if (event) {
    return event;
  }

  throw error(404, 'Not found');
}
