const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers')

const app = express();
app.use(cors());

app.use(bodyParser.json());

// graphql
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
}))

const mongoUri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0-bysxg.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(process.env.PORT || 3000, () => console.log("conectou no mongo e na porta 3000"))
}).catch((err) => console.log("Erro no mongoDB", err))

