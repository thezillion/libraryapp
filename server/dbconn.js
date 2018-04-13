var connectionString = {};
if (process.env.LIBRARY_PRODUCTION == "true") {
  connectionString = {
    database: "postgres",
    port: 5432,
    host: "db",
    user: "postgres",
    password: "example"
  };
} else {
  connectionString = {
    database: "library",
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "toor"
  };
}

module.exports = connectionString;
