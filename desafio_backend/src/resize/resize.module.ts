import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResizeController } from './resize.controller';
import { ResizeService } from './resize.service';
import { Image, ImageSchema } from './entities/image.entity';
import { ResizeImageProvider } from './providers/ResizeImageProvider';
import { RESIZE_IMAGE } from './providers/IResizeImageProvider';
import { ImageRepository } from './imageMetadata.repository';
import { S3UploadProvider } from './providers/S3UploadProvider';
import { IUPLOAD_PROVIDER } from './providers/IUploadProvider';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ResizeController],
  providers: [
    {
      useClass: ResizeImageProvider,
      provide: RESIZE_IMAGE,
    },
    {
      useClass: S3UploadProvider,
      provide: IUPLOAD_PROVIDER,
    },
    ResizeService,
    ImageRepository,
  ],
})
export class ImagesModule {}
