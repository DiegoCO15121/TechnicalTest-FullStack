import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UserSeeder } from './user.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const deviceSeed = app.get(UserSeeder);
  await deviceSeed.run();

  await app.close();
  console.log('Seed ejecutada');
}

bootstrap();
