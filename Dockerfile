FROM node:22.11.0
WORKDIR /app
ADD . /app
RUN npm install
RUN npx tsc
EXPOSE 3000
CMD ["npm", "start"]