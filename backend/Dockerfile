FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node typescript

CMD ["npm", "run", "start"]

