# Parking Lot

## How to run on your local with source code?

### How to install?
- Clone Project
- Run ``` npm install ```
```sh
npm install
```

### How to start project?
- Create .env file
- Set .env
```
MONGO_URI=<mongoLink>
MONGO_URI_TEST=<mongoLinkTest>
PORT=<YourPort> //Default => 2703
```
- Run project
```
npm start
```

### How to run Unit Test?
```sh
npm run test
```

## How to run with docker?
### Pull image
```sh
docker pull popwichittra/parkinglot:develop
```

### Run image
```sh
docker run -d -p <YOUR_PORT>:2703 --env MONGO_URI=<Mongo Link> popwichittra/parkinglot:develop
```

## API Description
### Api to create parking lot
``` POST ```
```
.../api/v1/parking/createParkingLot
```
#### - Data in body
```JavaScript
{
    "parkingSmall": {
      "pricePerHour": 20,
      "slotStart": 1,
      "slotEnd": 30
    },
    "parkingMedium": {
      "pricePerHour": 30,
      "slotStart": 31,
      "slotEnd": 60
    },
    "parkingLarge": {
      "pricePerHour": 40,
      "slotStart": 61,
      "slotEnd": 100
    }
}
```
If can create all will return http_status 200
If have some slot duplicate will show you duplicate slot code

### Api to park the car
``` POST ```
```
.../api/v1/parking/parkCar
```

```JavaScript
{
	"numberPlate": "g-7e8",
	"type": "medium"
}
```
If have slot for park will return ``` slotCode ```
If don't have slot for park will return ``` No slot ```

### Api to leave the slot
``` POST ```
```
.../api/v1/parking/leaveSlot
```

```JavaScript
{
	"slotCode":"2",
	"numberPlate": "lk-2133"
}
```
If have data will return  price for park car
If don't have data will throw error

### Api to get status of parking lot
``` GET ```
```
.../api/v1/parking/getFreeSlot
```

Data return
```JavaScript
[
    {
        "type": "small",
        "freeSlot": 27,
        "pricePerHour": 20
    },
    {
        "type": "medium",
        "freeSlot": 29,
        "pricePerHour": 30
    },
    {
        "type": "large",
        "freeSlot": 40,
        "pricePerHour": 40
    }
]
```

### Api to get registration plate number list by car size and get registration allocated slot number list by car size
``` GET ```
```
.../api/v1/parking/getAllNumberPlate?carSize=small
```

Data return
```JavaScript
[
    {
        "numberPlate": "lk-2133",
        "slotCode": "2",
        "timeIn": "2020-04-09T15:02:27.573Z"
    },
    {
        "numberPlate": "rg-4",
        "slotCode": "1",
        "timeIn": "2020-04-09T15:41:41.603Z"
    },
    {
        "numberPlate": "rg-6",
        "slotCode": "3",
        "timeIn": "2020-04-09T15:41:44.763Z"
    }
]
```
