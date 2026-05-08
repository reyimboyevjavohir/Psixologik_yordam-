import { app } from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/db.js';

async function start() {
  try {
    await prisma.$connect();
    console.log('✅ Ma\'lumotlar bazasiga ulanildi');
    app.listen(env.PORT, () => {
      console.log(`🚀 Backend ishga tushdi: http://localhost:${env.PORT}`);
      console.log(`   Muhit: ${env.NODE_ENV}`);
    });
  } catch (e) {
    console.error('❌ Ishga tushirishda xatolik:', e);
    process.exit(1);
  }
}

start();
