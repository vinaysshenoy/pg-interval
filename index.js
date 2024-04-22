const pgp = require('pg-promise')()

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
})

async function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS EXAMPLES (
            id SERIAL PRIMARY KEY,
            duration INTERVAL
        )
    `

    await db.none(sql)
    console.log(`Table created!`)
}

async function main() {
    await createTable()
    
    db.$config.pgp.end()
}

main()

