FROM node:9
RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
EXPOSE 3000
CMD ["yarn", "start"]