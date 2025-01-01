// データベースにアクセスするためのクライアントライブラリー
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "GraphQLチュートリアルをUdemyで学ぶ",
      url: "www.udemy-graphql-tutorial.com",
    },
  });
  const alllinks = await prisma.link.findMany();
  console.log(alllinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // データベース接続を閉じる
    prisma.$disconnect;
  });
