import pg from "pg";

const { Pool } = pg;

const CONFIG = {
  user: 'picodb_owner',
	password: 'XOgENH7VQeG9',
	host: 'ep-proud-art-a6pnozq1-pooler.us-west-2.aws.neon.tech',
	database: 'picodb',
	port: '5432',
	ssl: true
};

const pool = new Pool(CONFIG);

async function insertData(key, value = '') {
  if ((typeof value) == 'object') {value = JSON.stringify(value)}
  try {
    await pool.query('INSERT INTO cached (key, value) VALUES ($1, $2)', [key, value]);
  } catch (err) {
		console.error('Error inserting data:', err.message);
		throw err; // duplicate key (possible)
	}
}
async function updateData(key, value = '') {
	if (typeof value == 'object') {
		value = JSON.stringify(value);
	}
	try {
		let q = await pool.query('UPDATE cached SET value = $2 WHERE key = $1', [key, value]);
		if (q.rowCount == 0) {
			return await insertData(key, value);
		}
	} catch (err) {
		console.error('Error updating data:', err.message);
		throw err;
	}
}
async function deleteData(key) {
	try {
		await pool.query('DELETE FROM cached WHERE key = $1', [key]);
	} catch (err) {
		console.error('Error deleteing data:', err.message);
		throw err;
	}
}
async function getData(key) {
	try {
		let q = await pool.query('SELECT value FROM cached WHERE key = $1', [key]);
    if (q.rowCount == 0) {return ''}
    let val = q.rows[0].value;
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
	} catch (err) {
		console.error('Error getting data:', err.message);
		throw err;
	}
}

export async function handle({event, resolve}) {
  event.locals = {
    // pool: pool,
    insertData: insertData,
    updateData: updateData,
    deleteData: deleteData,
    getData: getData,
  }
  return await resolve(event);
}
