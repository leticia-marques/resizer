import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResizeController } from './resize.controller';
import { ResizeService } from './resize.service';
import { Image, ImageSchema } from './entities/image.entity';
import { ResizeImageProvider } from './providers/ResizeImageProvider';
import { RESIZE_IMAGE } from './providers/IResizeImageProvider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [ResizeController],
  providers: [
    {
      useClass: ResizeImageProvider,
      provide: RESIZE_IMAGE,
    },
    ResizeService,
  ],
})
export class ImagesModule {}
