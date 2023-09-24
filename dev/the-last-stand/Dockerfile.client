FROM node:alpine3.17

WORKDIR /app

COPY . .

RUN yarn

CMD ["yarn", "vite", "--host", "0.0.0.0"]