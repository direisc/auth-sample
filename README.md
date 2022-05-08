# Auth Sample

Auth sample with JWT using express, prisma, jest, and supertest.

This project has a sql3 database on folder for study and tests.

## run test with coverage

Project have jest configured with coverage, for run execute: `yarn test`

Jest create folder named `.coverage` with all issues for test coverage.

## run local

First install dependencies of project with `yarn`

Second run this command for execute local instance `yarn dev`

Now API running on [http://localhost:3000/](http://localhost:3000/)

### Requests

For initial information using:

```
curl --request GET \
  --url http://localhost:3000/
```

Using this request for authenticate:

```
curl --request POST \
  --url http://localhost:3000/authenticate \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "alice@prisma.io",
	"password": "alicePWD"
}'
```

Have two users on database:
```javascript
const users = [
  {
    email: 'alice@prisma.io',
    password: 'alicePWD',
  },
  {
    email: 'bob@prisma.io',
    password: 'bobPWD',
  },
]
```

Using this request for welcome, Authorization header is create with access_token from authenticate request:

```
curl --request GET \
  --url http://localhost:3000/welcome \
  --header 'Authorization: Bearer eyJhbGciOiJ...'
```

## Tests for the future

Now the tests are made using the sql3 database on local resource.

Upgrade code and test for using local database for testing, mock and others resources for prisma testing.

Prepare code for using .env values and other stuffs for production.
