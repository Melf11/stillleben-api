module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: "10.35.46.227",
        port: 3306,
        username: "k155912_stillleben",
        password: "5MIae0U5q&%CEgz6oJnA",
        database: "k155912_stillleben"
      },
      options: {}
    }
  },
});
