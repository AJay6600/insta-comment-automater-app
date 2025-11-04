import app from './app';
import config from './config/config';
import connectDB from './config/database';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server due to DB connection error.');
    process.exit(1);
  }
};

startServer();
