FROM node:19.5.0-alpine

EXPOSE $PORT

RUN mkdir -p /usr/src/website-niaefeup-frontend
WORKDIR /usr/src/website-niaefeup-frontend

COPY . .
RUN npm install

CMD ["npm", "run", "dev"]