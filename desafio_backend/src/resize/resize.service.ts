import { Inject, Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRequestDTO } from './dtos/IRequestDTO';
import {
  IResizeImageProvider,
  RESIZE_IMAGE,
} from './providers/IResizeImageProvider';
import { IResizedImageDTO } from './dtos/IResizeImageDTO';

@Injectable()
export class ResizeService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @Inject(RESIZE_IMAGE)
    private resizeImageProvider: IResizeImageProvider,
  ) {}

  async resize(createImageDto: IRequestDTO): Promise<IResizedImageDTO> {
    const imageResizedData = await this.resizeImageProvider.resize(
      createImageDto.image,
      createImageDto.compress,
    );

    const newImage = new this.imageModel({
      metadata: imageResizedData.metadadata,
    });

    newImage.save();
    return imageResizedData;
  }
}
