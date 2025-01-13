const jwt = require("jsonwebtoken");
APP_SECRET = "Graphql-is-aw3some";

// トークンを複合するための関数
function getTokenPayload(token) {
  // トークン化された物の前の情報（user.id）を複合する
  return jwt.verify(token, APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認する。認証権限がありますか？確認をする
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりませんでした");
      }
      // そのトークンを複合する
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
