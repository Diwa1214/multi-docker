# Build phase

FROM node:18-alpine as ProdBuilder

WORKDIR /usr/app 

COPY ./package.json .

RUN npm install 

COPY .  .

RUN npm run build 


# Run phase for react app



FROM ngnix 

EXPOSE 3000

COPY ./ngnix/default.conf /etc/ngnix/conf.d/default.conf

COPY --from=ProdBuilder /usr/app/build /usr/share/nginx/html