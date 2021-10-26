
# Stage 1
FROM node:14-alpine as build-step
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

19
# Stage 2
FROM nginx:latest
COPY --from=build-step /app/docs /usr/share/nginx/html