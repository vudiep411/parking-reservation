# Auth API
In this Auth API user can login and register a new account. JWT token will get sent back in a response body

## Installation
1. Install dependencies
    ```
    cd integration/auth
    npm install
    ```

2. Run the Auth service
   ```
   npm run dev
   ```
3. Go to http://localhost:5001/docs to test endpoints via Swagger API

## Test Auth endpoint
After testing login and registering, you will get a JWT token. Use postman or any other tools to send a get request to http://localhost:5001/test with the JWT as the Authorization header.
