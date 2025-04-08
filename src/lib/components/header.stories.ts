import FormsHeader from './forms-header.svelte';
import LayoutDecorator from '$lib/storybook-utils/layout-decorator.svelte';

export default {
    title: 'Atoms/Forms/Forms Header',
    component:  FormsHeader,
};

export const Header = {
    args: {
        label: 'Daltex'
    }
};


