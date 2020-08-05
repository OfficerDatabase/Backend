FROM node:10-alpine

WORKDIR /usr/src

COPY package*.json ./
RUN npm i && npm cache clean --force --loglevel=error

COPY . .
RUN npm run build

CMD ["npm", "start"]
