import { Layout } from 'lucide-svelte';
import ErrorPage from './+error.svelte';
import LayoutDecorator from '$lib/storybook-utils/layout-decorator.svelte';

export default {
  title: 'Pages/Error',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clear' }
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const NotFound = {
  parameters: {
    sveltekit_experimental: {
      stores: {
        page: {
          status: 404,
          error: {
            message: 'User not found'
          }
        }
      }
    }
  }
};

export const InternalServerError = {
  parameters: {
    sveltekit_experimental: {
      stores: {
        page: {
          status: 500,
          error: {
            message: 'Internal server error'
          }
        }
      }
    }
  }
};

export const Forbidden = {
  parameters: {
    sveltekit_experimental: {
      stores: {
        page: {
          status: 403,
          error: {
            message: 'Access forbidden'
          }
        }
      }
    }
  }
};

export const BadRequest = {
  parameters: {
    sveltekit_experimental: {
      stores: {
        page: {
          status: 400,
          error: {
            message: 'Bad request'
          }
        }
      }
    }
  }
};
