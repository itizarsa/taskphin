FROM node:20.11.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . .

EXPOSE 7777

CMD [ "npm", "start"]
