import { Module } from '@nestjs/common';
import { UserSeeder } from './seeds/user.seeder';
import { UserModule } from 'src/user/user.module';

@Module({
    imports:[UserModule],
    providers: [UserSeeder],
})
export class SeedModule {}
