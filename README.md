# Weather Application (Name: SimpleWeather)
This is a simple weather application, where you can look up a city and view essential data about current weather and the forecast for the next 5 days.

### Features
- Search and view current weather and 5-day forecast for a city

---

## Things to note before setting up & running this application

- This repo utilizes the following:
    - Front end: 
        * 'ReactJS' - frontend Javascript library
        * 'Material UI' - React component library and frontend design
        * 'Google Map Geocoding API' - API to retrieve geocode data for a location

    - Back end: 
        * 'Express' - Node.js web application framework
        * 'Postgres' - database management
        * 'Knex' - database querying
        * 'PassportJS' - authentication
        * 'DBeaver' - database administration tool to view database data
        * 'Open Meteo Weather API' - API to retrieve weather data based on latitude and longitude

## 1. Common setup

Clone the repo.

```bash

git clone https://github.com/vanessali825/weather-app.git

```

## 2. Installation

Install the dependencies on front end and back end.

```bash

cd weather-app/backend

npm install

cd weather-app/frontend

yarn install

```

## 3. '.env' file (BACK END)

Set up an **.env** file in the root directory of your backend folder 

```bash

DB_NAME='YOUR-DB-NAME'

DB_USERNAME='YOUR-DB-USERNAME'

DB_PASSWORD='YOUR-DB-PASSWORD'

FRONTEND_SERVER='YOUR-FRONTEND-REACT-URL'

JWT_SECRET='YOUR-JWT-SECRET-KEY'

```

## 4. Create a database in Postgres (same name as DB_NAME); run Knex migration to create empty data tables (BACK END)

```bash

knex migrate:latest

```

## 5. Run the express application using index.js (BACK END)

- `localhost:8000` should return the landing page, i.e. 'Hello World'

## 6. '.env' file (FRONT END)

Set up an **.env** file in the root directory of your frontend folder

```bash

REACT_APP_API_KEY='YOUR-GOOGLE-MAP-GEOCODING-API-KEY'

REACT_APP_API_SERVER='YOUR-BACKEND-SERVER-PORT URL'

HTTPS='true'

```

## 7. Run application

``` bash

yarn start dev

```