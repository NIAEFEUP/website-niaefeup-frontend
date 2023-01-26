FROM node:19.5.0-alpine

EXPOSE $PORT

RUN mkdir -p /usr/src/website-niaefeup-frontend
WORKDIR /usr/src/website-niaefeup-frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY .storybook/ .storybook/
COPY .svelte-kit/ .svelte-kit/
COPY static/ static/
COPY postcss.config.cjs postcss.config.cjs
COPY svelte.config.js svelte.config.js
COPY tailwind.config.cjs tailwind.config.cjs
COPY tsconfig.json tsconfig.json
COPY vite.config.js vite.config.js

COPY src/ src/

CMD ["npm", "run", "dev"]
