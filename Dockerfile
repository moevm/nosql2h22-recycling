FROM node:16
ENV DIRPATH=backend
WORKDIR /

ENV BUILD_PATH=/backend/public

COPY ./backend/ /backend/
COPY ./generator/ /generator/
COPY ./client-admin/ /client-admin/
COPY ./package.json /package.json
COPY ./entrypoint.sh /entrypoint.sh

RUN npm i
RUN npm run deps:backend
RUN npm run deps:client-admin
RUN npm run deps:generator

RUN npm run build:client-admin
RUN npm run build:backend
RUN npm run build:generator

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 8000
