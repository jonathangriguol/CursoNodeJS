FROM node

WORKDIR /ecommerce

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]