import { ApolloServer } from "apollo-server"
import { gql } from "apollo-server"

export const typeDefs = gql`
  type Query {
    cars: [Car!]!
    groups: [Group]
  }

  type Mutation {
    someMutation(arg: String = "string"): Car
  }

  enum FeatureFields {
    ONE
    TWO
    THREE
    FOUR
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    hasCar(id: ID!): Boolean! # ???: isn't it shit?
    name: String!
    image: Image!
    description: String!
    features: FeatureSet
    cars(take: Int = 20, skip: Int = 0): [Car]
  }

  type Image {
    id: ID!
    url: String!
  }

  type FeatureSet {
    data: [FeatureFields]
    separateFeaturesApplication: Boolean!
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
