FROM node:16-alpine as build

# Creating app directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Transfer app contents to its directory
ADD . /app

ARG NOTES_SERVER_HOST
ARG NOTES_SERVER_MODE

ENV REACT_APP_SERVER_HOST=${NOTES_SERVER_HOST}
ENV REACT_APP_SERVER_MODE=${NOTES_SERVER_MODE}

# Build the app using Webpack
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# react router
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

