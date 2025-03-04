FROM node:18
RUN mkdir -p /var/www/applications-service
WORKDIR /var/www/applications-service
# Accept a build argument for the .npmrc content.
ARG NPMRC_CONTENT
# If NPMRC_CONTENT is provided, create /root/.npmrc with its contents.
RUN if [ -n "$NPMRC_CONTENT" ]; then echo "$NPMRC_CONTENT" > /root/.npmrc; fi
ADD . /var/www/applications-service
RUN npm install
CMD npm run build && npm run start:prod