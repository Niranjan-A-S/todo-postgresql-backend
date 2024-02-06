import { Pool } from "pg";

export const connectToDB = async () => {
    try {
        const pool = new Pool({
            host: 'localhost',
            password: process.env.DB_PASSWORD,
            user: 'postgres',
            database: 'todo'
        })
        await pool.connect();
        return pool;
    } catch (error) {
        console.log('Error Connecting to database');
        process.exit(1);
    }
}
