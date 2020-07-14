FROM node:12-alpine as build-stage

# Add all our files install and start
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:stable
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'