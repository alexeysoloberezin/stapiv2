FROM node:18-slim as install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/
COPY . .

RUN corepack enable

RUN corepack prepare yarn@4.5.1 --activate

RUN yarn install

RUN yarn build


FROM node:18-slim

WORKDIR /app/

RUN corepack enable

RUN corepack prepare yarn@4.5.1 --activate

COPY --from=install /app ./
COPY ./public .

EXPOSE 1337

CMD ["yarn", "start"]
