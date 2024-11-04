# FROM node:16-alpine

# WORKDIR /furniture-shop-management/backend

# COPY package*.json ./

# RUN npm install

# RUN npm install -g @babel/cli @babel/core

# COPY . .

# RUN npm run build-src

# CMD ["npm", "run", "build"]

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install --save-dev @babel/cli @babel/preset-env @babel/core
RUN npm ci

COPY --chown=node:node . .

USER node
CMD ["npx", "babel-node", "src/server.js"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install --save-dev @babel/cli @babel/preset-env @babel/core
RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist


CMD [ "node", "dist/server.js" ]
