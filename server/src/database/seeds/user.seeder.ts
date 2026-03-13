import { Seeder } from 'typeorm-extension';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/user/entities/address.entity';
import { UserRole, UserStatus } from 'src/user/enums/user.enums';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  public async run(): Promise<any> {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users: Partial<User>[] = [
      {
        firstName: 'Admin',
        lastName: 'System',
        email: 'admin@test.com',
        phoneNumber: '+5219510000000',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        address: {
          street: 'Av. Principal',
          number: '123',
          city: 'Oaxaca',
          postalCode: '68000',
        } as Address,
        profilePicture: 'https://example.com/admin-profile.jpg',
        password: adminPassword,
      },
      {
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@test.com',
        phoneNumber: '+5219511111111',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        address: {
          street: 'Calle Reforma',
          number: '456',
          city: 'Oaxaca',
          postalCode: '68050',
        } as Address,
        profilePicture: 'https://example.com/user-profile.jpg',
        password: userPassword,
      },

      ...Array.from({ length: 48 }, (_, i) => ({
        firstName: `User${i + 3}`,
        lastName: `Test${i + 3}`,
        email: `user${i + 3}@test.com`,
        phoneNumber: `+521951${(1000000 + i).toString().padStart(7, '0')}`,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        address: {
          street: 'Calle Demo',
          number: `${100 + i}`,
          city: 'Oaxaca',
          postalCode: `680${(10 + i).toString().padStart(2, '0')}`,
        } as Address,
        profilePicture: `https://example.com/user-${i + 3}.jpg`,
        password: userPassword,
      })),
    ];

    await this.repo.save(users);
  }
}
