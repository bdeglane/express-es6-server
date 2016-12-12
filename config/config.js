export const config = {
  development: {
    app: {
      // port the node instance listening
      port: 3010,
      // concerning the json web token
      // for auth users
      token: {
        secret: "secret",
        expire: 84000
      }
    },
    database: {
      host: "127.0.0.1",
      port: "5432",
      database: "test_db",
      user: "test",
      password: "test"
    }
  }
};
