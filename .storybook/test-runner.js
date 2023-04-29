const { getStoryContext } = require('@storybook/test-runner');
const { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } = require('@storybook/addon-viewport');

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
          [screen]: parseInt(size),
        }),
        {},
      );

    if (parsedViewportSizes) page.setViewportSize(parsedViewportSizes);
  },
};
