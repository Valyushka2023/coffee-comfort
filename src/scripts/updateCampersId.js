import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../../src/db/campers.json');

async function updateCampersId() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const campersData = JSON.parse(data);
    const updatedItems = campersData.items.map(camper => ({
      ...camper,
      _id: new mongoose.Types.ObjectId().toHexString(),
    }));

    const updatedData = { items: updatedItems };
    const updatedJson = JSON.stringify(updatedData, null, 2);

    await fs.writeFile(filePath, updatedJson, 'utf8');
  } catch {
    //  Ігноруємо помилку, бо вона не критична
  }
}

updateCampersId();
