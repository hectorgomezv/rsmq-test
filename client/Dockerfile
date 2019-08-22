FROM node:10-buster-slim
RUN mkdir /app
WORKDIR /app
COPY ./src ./src
COPY ./server.js ./server.js
COPY ./package.json ./
RUN npm install --production
EXPOSE 4000
CMD ["node", "./server"]