# graphql-server

Start with `$ node server.js` then go to `localhost:3000/api`

### Example
Basic query:
```javascript
{
  user(id: 391) {
    username,
    domains {
      id
    }
  }
}
```
