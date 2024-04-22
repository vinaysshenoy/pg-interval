const pgp = require('pg-promise')()
const { Duration } = require('luxon')

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
})

async function ensureTableExists() {
    const sql = `CREATE TABLE IF NOT EXISTS EXAMPLES (id SERIAL PRIMARY KEY, duration INTERVAL)`

    await db.none(sql)
    console.log(`Table is ready for use!`)
}

async function saveDurationFailing(duration) {
    console.log(`Saving: ${duration}, as ISO: ${duration.toISO()}`)
    const sql = `INSERT INTO EXAMPLES (duration) VALUES (CAST($1 AS INTERVAL))`

    try {
        await db.none(sql, [duration])
        return true
    } catch (error) {
        console.log(`Could not save duration!`)
        console.error(error)
        return false
    }
}

async function saveDurationSucceeding(duration) {
    console.log(`Saving: ${duration}, as ISO: ${duration.toISO()}`)
    const sql = `INSERT INTO EXAMPLES (duration) VALUES (CAST($1 AS INTERVAL))`

    await db.none(sql, [duration.toISO()])
    console.log(`Saved duration successfully!`)
    return true
}

async function printAllRows() {
    const sql = `SELECT * FROM EXAMPLES`

    const records = await db.manyOrNone(sql)

    console.log(records)
}

async function main() {
    await ensureTableExists()

    const randomDuration = Duration.fromMillis(Math.random() * 100000)
    
    let savingSucceeded = false
    // savingSucceeded = await saveDurationFailing(randomDuration)
    savingSucceeded = await saveDurationSucceeding(randomDuration)

    if (savingSucceeded) {
        await printAllRows()
    }

    db.$config.pgp.end()
}

main()

