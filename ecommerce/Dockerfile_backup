FROM node:18-alpine

WORKDIR /

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD ["node", "src/app.js"]