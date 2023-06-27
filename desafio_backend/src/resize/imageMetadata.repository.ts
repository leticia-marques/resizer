import { ImageEntityRepository } from '../database/images.entity.repository';
import { Image, ImageDocument } from './entities/image.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageRepository extends ImageEntityRepository {
  constructor(@InjectModel(Image.name) imageModel: Model<ImageDocument>) {
    super(imageModel);
  }
}
