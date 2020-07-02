import { connect, ConnectionOptions, Mongoose } from 'mongoose';

const variables = [
    process.env.MONGO_USER,
    process.env.MONGO_PASSWORD,
    process.env.MONGO_HOST,
    process.env.MONGO_DB
];

const [ user, password, host, db ] = variables;

const url = `mongodb+srv://${ user }:${ password }@${ host }/${ db }`

const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

export default {
    connect(): Promise<Mongoose> {
        console.log('Connecting to database...')
        if (variables.some(value => value === undefined)) {
            throw 'At least one of the environmental variables was not set'
        }
        return connect(url, options)
    }
}