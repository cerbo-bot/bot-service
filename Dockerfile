FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

# Modify the ENV PORT no.
ENV PORT=5000

# Modify the Exposed PORT no.
EXPOSE 5000

CMD ["yarn", "start"]