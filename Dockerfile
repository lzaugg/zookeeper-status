FROM risingstack/alpine:3.3-v6.0.0-3.5.0

ENV ZOOKEEPER_HOST localhost
ENV ZOOKEEPER_PORT 2181
ENV LISTEN_PORT 8080

COPY package.json .

RUN npm install

COPY index.js .

RUN addgroup checkzk && adduser checkzk -D -G checkzk

#USER checkzk

EXPOSE $LISTEN_PORT

CMD ["npm", "start"]
