const { getStoryContext } = require('@storybook/test-runner');
const { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } = require('@storybook/addon-viewport');
const { injectAxe, checkA11y, configureAxe } = require('axe-playwright');

// Set the viewport to the default viewport for the story
module.exports = {
  async preRender(page, story) {
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
          [screen]: parseInt(size)
        }),
        {}
      );

    if (parsedViewportSizes) page.setViewportSize(parsedViewportSizes);

    await injectAxe(page); // For a11y testing
  },

  async postRender(page, story) {
    const storyContext = await getStoryContext(page, story);

    // Do not run a11y tests on disabled stories.
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

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
