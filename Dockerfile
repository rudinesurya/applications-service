FROM node:18
RUN mkdir -p /var/www/applications-service
WORKDIR /var/www/applications-service
ADD . /var/www/applications-service
RUN npm install
CMD npm run build && npm run start:prod