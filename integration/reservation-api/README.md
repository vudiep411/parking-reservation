# Main Application API
These APIs are for the main parking reservation application.

## Architecture / Workflow

## Schema

## Installation
1. Install dependencies
    ```
    cd integration/reservation-api
    npm install
    ```

2. Run the Auth service
   ```
   npm run dev
   ```
3. Go to http://localhost:5000/docs to test endpoints via Swagger API

## Docker

```
docker build -t reservation:1 .\integration\reservation-api\
```