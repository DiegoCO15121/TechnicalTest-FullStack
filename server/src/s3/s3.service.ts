import { Injectable, NotFoundException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION')!,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY')!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, id: number) {
  const key = `users/${id}/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: this.configService.get<string>('AWS_BUCKET')!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await this.s3.send(command);

  const url = `https://${this.configService.get<string>('AWS_BUCKET')}.s3.amazonaws.com/${key}`;

  return { url };
}

  async getProfilePicture(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return {
      profilePicture: user.profilePicture,
    };
  }

  async deleteProfilePicture(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET')!,
      Key: key,
    });

    await this.s3.send(command);
  }

  async updateProfilePicture(id: number, file: Express.Multer.File) {
  const user = await this.userRepository.findOneBy({ id });

  if (!user) throw new NotFoundException('Usuario no encontrado');

  if (user.profilePicture) {
    const urlObj = new URL(user.profilePicture);
    const key = urlObj.pathname.substring(1);

    await this.deleteProfilePicture(key);
  }

  const { url } = await this.uploadFile(file, id);

  user.profilePicture = url;

  await this.userRepository.save(user);

  return {
    profilePicture: url,
  };
}
}
