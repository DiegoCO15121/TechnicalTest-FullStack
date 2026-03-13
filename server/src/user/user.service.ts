import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationUserDTO } from './dto/pagination-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepopsitory: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.UserRepopsitory.create(createUserDto);
    const { password, ...userData } = user;
    const newPassword = await bcrypt.hash(password, 10);

    const userHashed = {
      password: newPassword,
      ...userData,
    };
    const newUser = await this.UserRepopsitory.save(userHashed);

    return {
      userId: newUser.id,
    };
  }

  async findAll(paginationUserDto: PaginationUserDTO) {
    const { page = 1, limit = 10, role, status, search } = paginationUserDto;

    const query = this.UserRepopsitory.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        'user.email ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (status) {
      query.andWhere('user.status = :status', { status });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    query
      .orderBy('user.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [users, total] = await query.getManyAndCount();

    const filteredUser = users.map((user) => {
      const { password, profilePicture, ...data } = user;

      return data;
    });

    return {
      users: filteredUser,
      page,
      limit,
      total,
    };
  }

  async findOne(id: number) {
    const user = await this.UserRepopsitory.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, address, ...userData } = user;

    return {
      ...userData,
      street: address.street,
      number: address.number,
      city: address.city,
      postalCode: address.postalCode,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepopsitory.preload({ id, ...updateUserDto });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newUser = await this.UserRepopsitory.save(user);

    const { password, profilePicture, ...data } = newUser;

    return data;
  }

  async remove(id: number) {
    const user = await this.UserRepopsitory.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.UserRepopsitory.delete(id);

    return 'Usuario Eliminado Correctamente';
  }
}
