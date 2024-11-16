import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import VariableVisibilityInput from './variable-visibility-input.svelte';

export default {
  title: 'Atoms/Inputs',
  component: VariableVisibilityInput,
  parameters: {
    layout: 'centered'
  }
};

export const VariableVisibility = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check initial input type', async () => {
      const input = await canvas.findByTestId('password-input');

      await expect(input).toHaveAttribute('type', 'password');
    });

    await step('Enter test text', async () => {
      const input = await canvas.findByTestId('password-input');

      await fireEvent.change(input, { target: { value: 'test_password' } });

      await expect(input).toHaveValue('test_password');
    });

    await step('Show password', async () => {
      const toggleButton = await canvas.findByRole('button');

      await fireEvent.click(toggleButton);

      const input = await canvas.findByRole('textbox');
      await expect(input).toHaveAttribute('type', 'text');
    });

    await step('Hide password', async () => {
      const toggleButton = await canvas.findByRole('button');
      await fireEvent.click(toggleButton);

      const input = await canvas.findByTestId('password-input');
      await expect(input).toHaveAttribute('type', 'password');
    });
  }
};
