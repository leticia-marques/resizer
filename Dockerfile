FROM node:18

WORKDIR /home
COPY ./desafio_backend/package*.json .

USER node

EXPOSE 8080

