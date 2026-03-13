import { forwardRef, Module } from '@nestjs/common';
import { UploadController } from './s3.controller';
import { S3Service } from './s3.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [UploadController],
    providers: [S3Service],
    imports: [UserModule, forwardRef(()=> AuthModule)]
})
export class S3Module {}
