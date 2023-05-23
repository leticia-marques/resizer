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
import { ImageRepository } from './imageMetadata.repository';

@Injectable()
export class ResizeService {
  constructor(
    private readonly metaDataRepository: ImageRepository,
    // @InjectModel(Image.name) private imageModel: Model<Image>,
    @Inject(RESIZE_IMAGE)
    private resizeImageProvider: IResizeImageProvider,
  ) {}

  async resize(createImageDto: IRequestDTO): Promise<IResizedImageDTO> {
    const imageResizedData = await this.resizeImageProvider.resize(
      createImageDto.image,
      createImageDto.compress,
    );

    const newImage = await this.metaDataRepository.create({
      metadata: imageResizedData.metadadata,
    });

    return imageResizedData;
  }
}
