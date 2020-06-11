const ApolloClient = require('apollo-client').default
const { gql } = require('apollo-boost')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
require('cross-fetch/polyfill')

require('dotenv').config()

const cache = new InMemoryCache()

const link = new HttpLink({
  fetch,
  uri: process.env.GRAPHQL_ENDPOINT
})

const client = new ApolloClient({
  cache,
  link
})

/** ,
  headers: {
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE:
      process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE
  } */

async function testGet () {
  return await client.query({
    query: gql`
      {
        prices {
          id
          from
        }
      }
    `
  })
}

async function savePrice (from, to, price) {
  return await client.mutate({
    mutation: gql`
      mutation {
        insert_prices(
          objects: [{ from: "${from}", to: "${to}", price: ${price} }]
        ) {
          affected_rows
          returning {
            price
            from
            to
          }
        }
      }
    `
  })
}
async function testRun () {
  try {
    //const response = await testGet()
    const response = await savePrice('USDC', 'DAI', 1029849209877)
    console.log(`response : ${JSON.stringify(response, null, 2)}`)
  } catch (error) {
    console.log(`error : ${JSON.stringify(error, null, 2)}`)
  }
}
//testRun()

module.exports = {
  savePrice
}
