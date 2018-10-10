# take default image of node boron i.e  node 6.x
FROM node:8.9 as builder
RUN npm i -g yarn

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
COPY . /app/

RUN yarn

# compile to ES5
RUN yarn build

FROM node:8.9 

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# set up public and private keys
RUN echo -e 'y\n'|ssh-keygen -q -t rsa -b 4096 -N "" -f private.key &&\
    openssl rsa -in private.key -pubout -outform PEM -out private.key.pub

#USER 50000:50000

# expose port 4000
EXPOSE 4000

# cmd to start service
CMD [ "node", "dist/index.js"]
