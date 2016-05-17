FROM node:5.0.0

#install Node modules
RUN apt-get update 
RUN npm install express -g
RUN npm install nodemon -g
RUN npm install webpack -g

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Bundle app source
COPY . /usr/src/app

#NPM install
RUN npm install

EXPOSE 80
CMD [ "npm","start" ]
