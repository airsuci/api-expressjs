FROM node:14.20-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/airsuci/api-expressjs.git .

RUN npm install
#RUN npm install dotenv
#RUN npm install mysql
#RUN npm install nodemon -g

COPY . .
EXPOSE 3030
CMD [ "node", "app.js" ]