FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 5173

CMD npm install && npm run dev
