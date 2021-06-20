#FROM nginx:1.17.1-alpine
#COPY /dist/angular-ecommerce /usr/share/nginx/html

#########################################################
#to build image
#docker build -t angular-ecommerce .



# Stage 1
FROM node:12.16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod


# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/angular-ecommerce /usr/share/nginx/html
#EXPOSE 80
#["ng","serve","--host", "0.0.0.0"]