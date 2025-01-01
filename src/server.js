const { ApolloServer, gql } = require("apollo-server");

// GraphQLのスキーマ定義
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
