import { http, HttpResponse } from 'msw';
import Layout from '../../+layout.svelte';
import Page from './+page.svelte';
import LayoutDecorator from '@/lib/storybook-utils/layout-decorator.svelte';

export default {
  title: 'Pages/UserInfo',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clear' }
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const user1 = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/accounts/1', async () => {
          return HttpResponse.json({
            name: 'Mr. Denver Jenkins: TeamMember',
            email: 'alica.considine@hotmail.com',
            bio: 'Quod fugiat praesentium earum consectetur.',
            birthDate: '10-07-1991 23:28',
            photo: 'https://picsum.photos/1600/1200',
            linkedin: 'https://www.eula-langosh.info/enim/asperiores',
            github: 'https://www.christiane-kozey.net/rerum/dolorem#nobis',
            websites: [
              {
                url: 'https://www.deangelo-weissnat.org:39583/dolorum/quibusdamrepellendus#ipsam',
                iconPath: 'https://picsum.photos/320/200',
                label: 'Dolorum et molestiae quam repudiandae qui.',
                id: 12
              }
            ],
            id: 1
          });
        }),
        http.get('/', async () => {
          return new HttpResponse(null, {
            status: 200
          });
        })
      ]
    },
    sveltekit_experimental: {
      stores: {
        page: {
          params: {
            id: 1
          }
        }
      }
    }
  }
};
