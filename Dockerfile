FROM node:10.18.0-alpine as builder 
#Add multi stage to minimize the image size and for the best run time performance

WORKDIR /app
COPY *.js /app/
COPY src/api/v1/controllers/*.js /app/src/api/v1/controllers/
COPY src/api/v1/routes/*.js /app/src/api/v1/routes/
COPY src/config/*.js /app/src/config/
COPY src/models/*.js /app/src/models/
COPY src/services/*.js /app/src/services/
COPY package*.json /app/

RUN npm ci

FROM node:10.18.0-alpine
WORKDIR /app
COPY --from=builder /app/ .

ENTRYPOINT ["npm", "start"]