FROM mhart/alpine-node:5

MAINTAINER Gregory Daynes <gregdaynes@gmail.com>

# Mount local folder
COPY . /api
WORKDIR /api

# If you have native dependencies, you'll need extra tools
RUN apk add --update \
    git
    #make \
    #gcc \
    #g++ \
    #python

#RUN npm install -g nodemon
RUN npm install -g pm2

# If you had native dependencies you can now remove build tools
RUN apk del \
    git
    #make \
    #gcc \
    #g++ \
    #python 
    #&& \
    #rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp
