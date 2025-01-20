import { userEvent, within } from '@storybook/testing-library';
import { http, HttpResponse } from 'msw';
import Layout from '../+layout.svelte';
import Page from './+page.svelte';
import LayoutDecorator from '@/lib/storybook-utils/layout-decorator.svelte';

export default {
  title: 'Pages/Login',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clear' }
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const Login = {};

export const Success = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/auth', async () => {
          return new HttpResponse(null, {
            status: 200
          });
        }),
        http.get('/', async () => {
          return new HttpResponse(null, {
            status: 200
          });
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('email');

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 10
    });

    const passwordInput = canvas.getByPlaceholderText('password');

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 10
    });

    const submitButton = canvas.getByText('Iniciar Sessão');
    await userEvent.click(submitButton);
  }
};

export const Failure = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/auth', async () => {
          return new HttpResponse(null, {
            status: 403
          });
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('email');

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 10
    });

    const passwordInput = canvas.getByPlaceholderText('password');

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 10
    });

    const submitButton = canvas.getByText('Iniciar Sessão');
    await userEvent.click(submitButton);
  }
};
