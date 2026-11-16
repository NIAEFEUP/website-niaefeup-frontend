# Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Development
FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Static build
FROM deps AS build
ARG PUBLIC_NIDDLE_API_URL
ARG PUBLIC_NIDDLE_ASSOCIATION_ID
ENV PUBLIC_NIDDLE_API_URL=$PUBLIC_NIDDLE_API_URL \
    PUBLIC_NIDDLE_ASSOCIATION_ID=$PUBLIC_NIDDLE_ASSOCIATION_ID
COPY . .
RUN npm run build

# Production (nginx)
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
