FROM mhart/alpine-node:12

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]