FROM node:16
ENV DIRPATH=/backend
WORKDIR /$DIRPATH

COPY package.json /$DIRPATH/package.json
COPY node_modules /$DIRPATH/node_modules
COPY build /$DIRPATH/build
COPY public /$DIRPATH/public

EXPOSE 8000
