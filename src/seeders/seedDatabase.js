import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Camper from '../../src/models/CamperModel.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const filePath = path.join(__dirname, '../../src/db/campers.json');
    const data = await fs.readFile(filePath, 'utf8');
    const campersData = JSON.parse(data);

    await Camper.deleteMany({});

    const campersToInsert = campersData.items.map(camper => {
      const { gallery, ...rest } = camper; // Видаляємо _id та отримуємо gallery

      let galleryArray = [];
      if (typeof gallery === 'string') {
        try {
          const galleryObjects = JSON.parse(gallery);
          if (Array.isArray(galleryObjects)) {
            galleryArray = galleryObjects.map(img => img.original); // Беремо оригінальні URL зображень
          }
        } catch {
          // Ігноруємо помилку, бо вона не критична
        }
      } else if (Array.isArray(gallery)) {
        galleryArray = gallery.map(img => img.original); // Якщо gallery вже масив об'єктів
      }

      return { ...rest, gallery: galleryArray }; // Повертаємо решту полів та оброблений gallery
    });

    await Camper.insertMany(campersToInsert);

    mongoose.disconnect();
  } catch {
    // Ігноруємо помилку, бо вона не критична
  }
}
seedDatabase();
