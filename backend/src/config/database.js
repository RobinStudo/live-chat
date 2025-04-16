import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export const initDatabase = async () => {
	db = await open({
		filename: './data/database.sqlite',
		driver: sqlite3.Database,
	});
	console.log('✅ SQLite connected');
};

export const getDb = () => db;
