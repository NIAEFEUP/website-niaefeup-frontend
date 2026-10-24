# Website NIFEUP - FrontEnd

[![CI](https://github.com/NIAEFEUP/website-niaefeup-frontend/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/NIAEFEUP/website-niaefeup-frontend/actions/workflows/ci.yml)

The frontend of the website for NIFEUP, a student branch in FEUP. Live at [nifeup.com](https://nifeup.com).

The site is currently fully **static**: every page is prerendered at build time and served by nginx. There is currently no backend; all content lives in JSON files in this repository (see [Editing content](#editing-content)).

## Technologies used

- [SvelteKit](https://svelte.dev/docs/kit) with [Svelte 5](https://svelte.dev/docs/svelte) (runes mode) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Tailwind CSS v4](https://tailwindcss.com/) - CSS framework
- [Vite](https://vite.dev/) - Build tool
- [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapter-static) - Static site generation
- [nginx](https://nginx.org/) - Serves the production build (see `nginx.conf`)

## Development setup

### Prerequisites

You need **one** of the following:

- [Node.js](https://nodejs.org) **22.12 or newer** (enforced: `npm install` fails on older versions), **or**
- [Docker](https://docs.docker.com/engine/install/) with the [Compose plugin](https://docs.docker.com/compose/install/) (included with Docker Desktop and recent Docker Engine installs).

If you use a version manager, the repo already pins the Node version:

- **asdf / mise**: `.tool-versions` - run `asdf install` or `mise install`.
- **Nix**: `flake.nix` - run `nix develop`.

> On Linux, follow [these instructions](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) to run Docker without `sudo`.

### Running with npm

```bash
npm ci          # install dependencies (exactly as in package-lock.json)
npm run dev     # start the dev server at http://localhost:3000

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Running with Docker

```bash
./dev.sh
```

This builds the `dev` image (rebuilding it if dependencies changed) and starts the dev server at http://localhost:3000. `src/` and `static/` are mounted into the container, so changes are picked up with hot reload.

Press **Ctrl-C** to stop; the script then removes the containers (`docker compose down`).

> If you change `package.json`, `vite.config.ts` or other root config files, restart `./dev.sh` so the image is rebuilt.

### Linting, formatting and type checking

We use [ESLint](https://eslint.org/) for code conventions, [Prettier](https://prettier.io/) for formatting and [svelte-check](https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check) for type checking. The configurations can be found in `eslint.config.mjs`, `.prettierrc` and `tsconfig.json`.

```bash
npm run lint          # ESLint (code conventions)
npm run lint:fix      # auto-fix ESLint issues
npm run format        # format the code with Prettier
npm run format:check  # verify formatting without changing files
npm run check         # type check with svelte-check
npm run ci            # format check + lint + type check (same as CI)
```

**Run `npm run ci` before opening a pull request** - CI runs `npm run build` and `npm run ci` on every push and PR to `develop` and `master`.

We strongly recommend these VS Code extensions:

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (optional)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (optional)

To format automatically on save, add the following to your VS Code settings:

```json
"editor.formatOnPaste": true,
"editor.formatOnSave": true,
```

## Building

With npm:

```bash
npm run build     # outputs the static site to build/
npm run preview   # serve the production build at http://localhost:3000
```

With Docker (production image, static build served by nginx):

```bash
docker build --target prod -t {IMAGE_NAME} .
docker run -p {YOUR_PORT}:80 {IMAGE_NAME}
```

The `dev` target (`docker build --target dev`) runs the development server instead.

## Deployment

- `develop` is the main development branch - open pull requests against it.
- `master` is production. Every push to `master` builds the `prod` Docker image and pushes it to [NIployments](https://github.com/NIAEFEUP/niployments) (see `.github/workflows/niployments.yaml`).

## Editing content

Since there is no backend yet, the site's content is stored as JSON and imported at build time:

| Content        | Data file                                  | Images                                                           |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| Events         | `src/lib/data/api/events/list.json`        | `static/api_images/events/`                                      |
| Projects       | `src/lib/data/api/projects/list.json`      | `static/api_images/projects/`, `static/api_images/technologies/` |
| Team (current) | `src/lib/data/api/generations/latest.json` | `static/api_images/members/`                                     |

The shape of each entry is defined in `src/types/` (e.g. `event.ts`, `project.ts`, `team-member.ts`). Images are referenced by their public path, e.g. `"/api_images/events/sinf_2025.jpg"`.

A few things to keep in mind:

- **Projects**: the `slug` becomes the URL (`/projects/{slug}`) and must be unique. A page is prerendered for every project in the list.
- **Images**: compress them before committing (prefer WebP, at most ~1600px wide, ideally < 300 KB). They are served as-is.
- **Privacy**: everything in these JSON files ends up in the public JavaScript bundle. **Do not add personal data** (e.g. personal emails) that isn't meant to be shown on the site.

## Project Details

### Project Structure

The project follows the structure recommended by SvelteKit: https://svelte.dev/docs/kit/project-structure

```
src/
├── routes/
│   ├── +layout.ts           # enables prerendering for the whole site
│   └── (app)/               # route group with the shared layout (navbar, sidebar, footer)
│       ├── (home)/          # landing page (/)
│       ├── events/          # /events
│       ├── projects/        # /projects and /projects/[slug]
│       ├── team/            # /team
│       ├── contacts/        # /contacts
│       ├── 404/             # custom 404 page (served by nginx)
│       └── _components/     # components used by the layout and error pages
├── lib/
│   ├── components/          # reusable components (hexagons, buttons, forms, icons, ...)
│   ├── config/site.ts       # site name, URL, description and OG image
│   └── data/api/            # content JSON files (see "Editing content")
├── types/                   # TypeScript types for the content
└── styles/                  # Tailwind theme and utilities
static/                      # public assets (favicons, images, api_images)
archived/                    # pages that depended on the old backend (login, admin, profile, ...), kept for reference
```

### Conventions

- Components that are only used by one route live in a `_components/` folder next to it; shared ones go in `src/lib/components/`.
- File names use `kebab-case` (e.g. `project-tile.svelte`).
- Imports can use the `@/` alias for `src/` (e.g. `@/lib/config/site`) or SvelteKit's `$lib`.
- The site is in Portuguese (pt-PT) and addresses the reader informally (_tu_).

## Contributing

1. Pick (or open) an issue and create a branch from `develop`.
2. Make your changes and run `npm run ci`.
3. Open a pull request against `develop` and fill in the PR template (`Closes #<issue>`, description, screenshots for visual changes).
