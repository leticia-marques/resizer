# Resizer

It provides a simple and flexible solution for resizing images maintaining
aspect raio preservation.

## Features

- Aspect Ratio Preservation: The tool intelligently preserves the aspect ratio
  of the original image during resizing, ensuring that the visual integrity of
  the content is maintained without any distortion.

## Technologies

- NestJs
- Jimp
- Jest
- MongoDB

## Getting started

To get started with Resizer you'll need
[docker](https://docs.docker.com/engine/install/) and
[docker compose](https://docs.docker.com/compose/).

## Usage

```bash
git clone https://github.com/leticia-marques/resizer.git
```

```bash
# Enter the container:
docker-compose -it desafio bash
# Install dependencies:
npm i
# Start the tool:
npm run start
```

# Making a request

```json
{
  "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
  "compress": "0.9"
}
```
