# Build phase

FROM node:18-alpine as ProdBuilder

WORKDIR /usr/app 

COPY ./package.json .

RUN npm install 

COPY .  .

RUN npm run build 


# Run phase for react app



FROM nginx 

# It was already redirect to port 80 -> 3000 main nginx  file 
EXPOSE 3005

COPY ./ngnix/default.conf /etc/nginx/conf.d/default.conf

COPY --from=ProdBuilder /usr/app/build /usr/share/nginx/html