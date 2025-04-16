import app from './app.js';
import config from './config/config.js';
import { initDatabase } from './config/database.js';

console.log('🚀 Starting server...');

let server;

const startServer = async () => {
	try {
		// Connexion à la base SQLite
		await initDatabase();

		// Lancement du serveur
		server = app.listen(config.PORT, config.HOST, () => {
			console.log(`✅ Server running at Port :${config.PORT}`);
		});
	} catch (err) {
		console.error('❌ Failed to start server:', err);
		process.exit(1);
	}
};

startServer();

const exitHandler = () => {
	if (server) {
		server.close(() => {
			console.log('🛑 Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (err) => {
	console.error('💥 Unexpected error:', err);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	console.info('📴 SIGTERM received');
	if (server) {
		server.close();
	}
});
