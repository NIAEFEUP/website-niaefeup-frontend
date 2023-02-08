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
- [Docker](https://www.docker.com/)
- [Docker Compose](https://www.docker.com/)

### Installing Docker and Docker Compose

To install docker you can follow the instructions on the [Docker docs](https://docs.docker.com/engine/install/) (Select your Linux distribution on the Server section)

Follow [these](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user/) instructions to run Docker as a non root user.

After installing Docker follow these instructions on the [Docker docs](https://docs.docker.com/compose/install/) to install Docker Composer.


### Running

To run the development environment using Docker do:
```bash
./dev.sh
```

This will build the Docker image the first time you run and start the development server at port `3000` and storybook at port `6006`.

To stop press Ctrl-C and it will remove all related containers.

To run with npm (or pnpm or yarn) do:
```bash
# install project dependencies
npm install

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

You can run the unit tests using Docker with:

```bash
./test.sh
```

Alternatively you can use npm (or other package managers already mentioned) and do:
```bash
npm run test
```

### Storybook

We use [Storybook](https://storybook.js.org/) as a way to interactively preview widgets in isolation.

Storybook should be already running on port `6006` if you started `dev.sh` script.

Alternatively you can use npm (or other package managers already mentioned) and do:
```bash
npm run storybook
```

To write new stories refer to the [official documentation](https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction).

## Building

To create a production version of your app:

```bash
docker build -t {IMAGE_NAME} -f Dockerfile.prod .
docker run --env PORT=80 -p {YOUR_PORT}:80 {IMAGE_NAME}
```

Or with npm:
```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Project Details

### Project Structure

The project follow the structure recommended by SvelteKit: https://kit.svelte.dev/docs/project-structure
