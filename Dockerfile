FROM node:18

WORKDIR /app

COPY package* .
RUN npm ci

CMD ["npm", "run", "dev"]
