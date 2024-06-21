FROM node

WORKDIR /www/4Medicine/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]