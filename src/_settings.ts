import 'dotenv/config'

const PORT = Number(process.env.PORT) || 8000

const dbUri = process.env.USERSDB_URI
const secretOrKey = process.env.TOKEN_SECRET
const usersDbName = process.env.USERSDB_NAME
const eventsDbName = process.env.EVENTSDB_NAME
const categoriesDbName = process.env.CATEGORIESDB_NAME
const venuesDbName = process.env.VENUESDB_NAME
const venueCategoryDbName = process.env.VENUECATEGORYDB_NAME

export {
    PORT,
    dbUri, 
    secretOrKey, 
    categoriesDbName, 
    eventsDbName, 
    usersDbName,
    venuesDbName,
    venueCategoryDbName
}