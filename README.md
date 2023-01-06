# Website NIAEFEUP - FrontEnd

[![Build Preview](https://api.netlify.com/api/v1/badges/8ddc6c12-c861-4fd5-8087-2c076d090c5a/deploy-status?branch=develop)](https://develop--niaefeup-frontend.netlify.app/)

The frontend of the website for NIAEFEUP, a student branch in FEUP.

## Technologies used

- [SvelteKit](https://kit.svelte.dev/) - Frontend framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

## Development setup

### Prerequisites

- [Node 19+](https://nodejs.org)

### Running

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Linting

We use [ESLint](https://eslint.org/) for code conventions and [Prettier](https://prettier.io/) for formatting, to ensure a consistent coding style. The respective configurations can be found in `.eslintrc.cjs` and `.prettierrc`.

We strongly recommend the use of the [VSCode extension for Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and, optionally, the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Alternatively, you can run the linters manually:

```bash
npm run lint
npm run format
```

If you wish, you can activate the formatter to run automatically on save by adding the following fields to your VSCode settings:

```json
"editor.formatOnPaste": true,
"editor.formatOnSave": true,
```

### Testing

You can run the unit tests with:

```bash
npm run test:unit
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Project Details

### Project Structure

The project follow the structure recommended by SvelteKit: https://kit.svelte.dev/docs/project-structure
