FROM node:lts-alpine as butter
WORKDIR /app/server/
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]