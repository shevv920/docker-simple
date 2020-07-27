FROM node:12
WORKDIR /usr/src/my-app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 31990
ENTRYPOINT [ "node", "src/index.js" ]
