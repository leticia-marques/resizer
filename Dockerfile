FROM node:16

WORKDIR /home

# RUN useradd -ms /bin/bash admin
# COPY --chown=admin:admin home /home
COPY ./desafio_backend .

USER root

EXPOSE 8080

