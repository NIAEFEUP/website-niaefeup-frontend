FROM node:22-alpine

EXPOSE $PORT

RUN mkdir -p /usr/src/website-niaefeup-frontend
WORKDIR /usr/src/website-niaefeup-frontend

COPY . .
RUN npm ci

CMD ["npm", "run", "dev"]