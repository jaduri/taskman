module.exports = {
  reactStrictMode: true,
  env: {
    SECRET: "SOME_SECRET_VALUE",
    MONGO_URI: "mongodb://localhost:27017/taskman?retryWrites=true&w=majority"
  }
}
