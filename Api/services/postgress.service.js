const pg = require ('pg');

const execute = async (sql) => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'KyC',
        password: '07150126',
        port: 5432,
      });

    await client.connect();
    const res = await client.query(sql);
    await client.end();
    return res
};
module.exports = {execute};
