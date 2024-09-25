FROM node:16-alpine

WORKDIR /furniture-shop-management/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/cli @babel/core

COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]