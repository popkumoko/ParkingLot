# Parking Lot

### Installation
- Create .env file 
- Set 
MONGO_URI= mongoLink
MONGO_URI_TEST= mongoLinkTest

#### Run Project
```sh
npm i
npm start
```

#### Run Test
```sh
npm run test
```

## Docker
```sh
docker pull popwichittra/parkinglot:develop
docker run -d -p <YOUR_PORT>:2703 --env MONGO_URI=<Mongo Link> popwichittra/parkinglot:develop
```

