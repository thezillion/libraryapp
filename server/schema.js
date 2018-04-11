const graphql = require("graphql");
const pgp = require("pg-promise")();
const connectionString = require("./dbconn");

const db = pgp(connectionString);

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt
} = graphql;


const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve(obj, args) {
        const query = `SELECT * FROM "books" WHERE author=${obj.id}`;
        return db
          .many(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    }
  })
});

var BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(obj, args) {
        const query = `SELECT * FROM "authors" WHERE id=${obj.author}`;
        return db
          .one(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    authors: {
      type: GraphQLList(AuthorType),
      args: { id: { type: GraphQLList(GraphQLID) } },
      resolve(parentValue, args) {
        var query = `SELECT * FROM "authors"`;
        if (args.id) {
          const ids = args.id;
          query += " WHERE id=" + ids[0];
          for (var i = 1; i < ids.length; i++) query += " OR id=" + ids[i];
        }
        return db
          .many(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    },
    books: {
      type: GraphQLList(BookType),
      args: { id: { type: GraphQLList(GraphQLID) } },
      resolve(parentValue, args) {
        var query = `SELECT * FROM "books"`;
        if (args.id) {
          const ids = args.id;
          query += " WHERE id=" + ids[0];
          for (var i = 1; i < ids.length; i++) query += " OR id=" + ids[i];
        }
        return db
          .many(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
