const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const config = require('./config/config.json')

const app = express();

app.use(bodyParser.json());

app.use(cors());

// graphql
app.use('/graphql', graphqlHTTP({
    schema: '',
    rootValue: '',
    graphiql: true,
}))


const mongoUri =
    `mongodb+srv://${config.user}:${config.password}@cluster0-bysxg.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(3000, () => console.log("conectou no mongo na porta 3000"))
}).catch((err) => console.log("Erro no mongoDB", err))

