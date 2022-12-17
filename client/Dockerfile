FROM node:16
ENV DIRPATH=/client
ENV NODE_ENV=production

WORKDIR /$DIRPATH

COPY . /$DIRPATH/

RUN npm i
RUN npm run build

EXPOSE 3030
