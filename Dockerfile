FROM node:20-alpine
WORKDIR /api
COPY .  /api
RUN npm i
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]