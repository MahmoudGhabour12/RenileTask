FROM node:12.18-alpine
WORKDIR /app
COPY . .
RUN npm i
CMD ["npm", "start"]