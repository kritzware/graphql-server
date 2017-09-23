const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema')

const PORT = 3000
const app = express()

app.use('/api', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`)
})