const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Quote {
        _id: ID!
        quote: String!
        author: String!
    }
    type RootQuery {
        quotes: QuoteData!
    }
    schema {
        query: RootQuery
    }
`)