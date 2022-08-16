FROM node:14.20-alpine

# Create app directory
WORKDIR /app
RUN apk add --no-cache git
#COPY package*.json ./
RUN git clone https://github.com/airsuci/api-expressjs.git .

RUN npm install
#RUN npm install dotenv
#RUN npm install mysql
#RUN npm install nodemon -g

#FROM mysql:latest
#ENV MYSQL_ROOT_PASSWORD=root
#COPY ./database.sql /docker-entrypoint-initdb.d/

# Bundle app source
COPY . .
EXPOSE 3030
CMD [ "node", "app.js" ]