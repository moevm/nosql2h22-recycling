FROM node:16
ENV DIRPATH=/client
WORKDIR /$DIRPATH

COPY package.json /$DIRPATH/package.json
COPY .next /$DIRPATH/.next
COPY node_modules /$DIRPATH/node_modules
COPY server /$DIRPATH/server

EXPOSE 3030
