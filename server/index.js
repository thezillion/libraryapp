const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const api = require("./api");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/graphql', cors(), expressGraphQL({
   schema,
   graphiql: true
}));

app.use("/api", api);

app.listen(4000, () => {
   console.log('Listening...')
})
