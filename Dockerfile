FROM mhart/alpine-node:6.1.0

ENV ZOOKEEPER_HOST localhost
ENV ZOOKEEPER_PORT 2181
ENV LISTEN_PORT 8080
ENV NODE_ENV production

RUN mkdir /zkstatus && addgroup zkstatus && adduser zkstatus -D -G zkstatus && chown -R zkstatus /zkstatus

WORKDIR /zkstatus

USER zkstatus

COPY package.json .

RUN npm install

COPY index.js .

EXPOSE $LISTEN_PORT

CMD ["npm", "start"]
