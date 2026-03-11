import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = encodeURIComponent(getEnvVar('MONGODB_USER'));
    const password = encodeURIComponent(getEnvVar('MONGODB_PASSWORD'));
    const cluster = getEnvVar('MONGODB_CLUSTER');
    const dbName = getEnvVar('MONGODB_DB');

    const mongoUri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
