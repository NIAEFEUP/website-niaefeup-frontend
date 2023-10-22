import { error } from '@sveltejs/kit';
import type { Event } from '@/model/Event.js';

export async function load({ params }) {
  const event: Event = {
    title: 'Great event',
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
      startDate: '28-07-2022',
      endDate: '30-07-2022'
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
