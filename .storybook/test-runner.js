import { getStoryContext } from '@storybook/test-runner';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

export default {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const viewPortParams = context.parameters?.viewport;
    const defaultViewportName = viewPortParams?.defaultViewport;
    const viewports = { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS, ...viewPortParams?.viewports };
    const selectedViewport = viewports[defaultViewportName]?.styles;

    const parsedViewportSizes =
      selectedViewport &&
      Object.entries(selectedViewport).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          [screen]: parseInt(size, 10)
        }),
        {}
      );

    if (parsedViewportSizes) await page.setViewportSize(parsedViewportSizes);

    await injectAxe(page); // For a11y testing
  },

  async postVisit(page, story) {
    const storyContext = await getStoryContext(page, story);

    // Do not run a11y tests on disabled stories.
    if (storyContext.parameters?.a11y?.disable) return;

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules
    });

    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
  }
};
