FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

# Modify the ENV PORT no.
# ENV PORT=3000

# Modify the Exposed PORT no.
# EXPOSE 8080

CMD ["yarn", "start"]