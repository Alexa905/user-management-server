FROM node:16-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn add glob rimraf
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3001
ENTRYPOINT ["node", "src/index"]
