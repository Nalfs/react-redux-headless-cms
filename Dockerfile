FROM node:8
WORKDIR /usr/src/app
COPY cms-shop-backend/package*.json ./
RUN npm install
COPY cms-shop-backend/ .
COPY dist/ public/
EXPOSE 3000
CMD [ "npm", "start" ]