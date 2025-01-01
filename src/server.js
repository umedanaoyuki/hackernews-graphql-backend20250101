const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const { url } = require("inspector");

const prisma = new PrismaClient();

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  // resolverの中でどこでも使用できる
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
