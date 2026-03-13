import {
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { Auth } from 'src/auth/decorators/Auth.decorator';
import { UserRole } from 'src/user/enums/user.enums';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Auth(UserRole.ADMIN)
  @Get(':id')
  async getProfileImage(@Param('id') id: string) {
    return this.s3Service.getProfilePicture(+id);
  }

  @Auth(UserRole.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async updateProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.s3Service.updateProfilePicture(+id, file);
  }
}
