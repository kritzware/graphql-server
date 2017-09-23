const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const db = require('./db')

const DomainType = new GraphQLObjectType({
  name: 'Domain',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: res => res.domain_id
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: () => ({
    username: {
      type: GraphQLString,
      resolve: res => res[0].username
    },
    domains: {
      type: new GraphQLList(DomainType),
      resolve: async res => {
        const user_id = res[0].user_id
        const domains = await db.qry('SELECT * FROM domains_users_rel WHERE ?', { user_id })
        return Promise.all(domains)
      }
    }
  })
})

const BaseSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      "user": {
        type: UserType,
        args: {
          "id": { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return db.qry('SELECT * FROM users WHERE ?', { user_id: args.id })
        }
      }
    })
  })
})

module.exports = BaseSchema