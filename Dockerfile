FROM node:14.20-alpine
FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=root
COPY ./database.sql /docker-entrypoint-initdb.d/



# Create app directory
WORKDIR /app
RUN apk add --no-cache git
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
RUN git clone https://github.com/airsuci/api-expressjs.git .
#RUN npm install
#RUN npm install dotenv
#RUN npm install mysql
#RUN npm install nodemon -g

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 3030
CMD [ "node", "app.js" ]