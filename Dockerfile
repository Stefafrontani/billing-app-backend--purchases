FROM node:alpine
WORKDIR /backend-expenditures
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=development
CMD ["npm", "start"]