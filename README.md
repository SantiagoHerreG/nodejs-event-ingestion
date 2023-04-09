# Node JS app for Event ingestion

## Run server in dev mode:

``` npm run dev ```

## Post events

Use the following endpoint to send events: POST
``` http://localhost:3000/analytics ```

In the body of the request you must send a JSON object with the list of events such as:
``` [{
   "type": "event1",
   "user": 1
},
{
   "type": "event2",
   "user": 1
}] ```

Use the following endpoint to get all events: GET
``` http://localhost:3000/analytics ```

### Some tools used:

- Express
- Sequelize
- Typescript
- AJV
- sqlite3
- pug
- moment