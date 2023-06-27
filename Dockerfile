FROM node:16

WORKDIR /home

COPY ./desafio_backend .

USER root

EXPOSE 8000

