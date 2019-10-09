FROM node:10

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]


# COPY docker-entrypoint.sh /docker-entrypoint.sh

# RUN chmod +x /docker-entrypoint.sh

# COPY . /server/

# If you are building your code for production
# RUN npm ci --only=production

# EXPOSE 3000
# CMD [ "babel-node", "server/app.js" ]
