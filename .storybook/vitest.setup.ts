import { setProjectAnnotations } from '@storybook/sveltekit';
import * as previewAnnotations from './preview';

const annotations = setProjectAnnotations([previewAnnotations]);

export default annotations;
