FROM node:12-alpine as build-stage

# Add all our files install and start
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:stable
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/templates/default.conf
