FROM node:10.4

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn
ADD . .
RUN yarn db:seed

CMD ["npm","start"]
