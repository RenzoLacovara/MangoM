FROM node:18.16.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
ENV MONGODB_URL=mongodb+srv://reenzo22:Cofi2020@clustermango.rzq3wlu.mongodb.net/ecommerce?retryWrites=true&w=majority
CMD ["npm", "start"]