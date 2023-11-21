FROM node:18-alpine

WORKDIR "/app"

COPY npmrc.sh package.json tsconfig.json ./

RUN chmod +x ./npmrc.sh && sh npmrc.sh 

RUN npm install npm@latest

RUN npm ci

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 3000