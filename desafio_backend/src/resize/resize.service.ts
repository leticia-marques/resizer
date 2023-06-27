import { Inject, Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
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
    @Inject(RESIZE_IMAGE)
    private resizeImageProvider: IResizeImageProvider,
  ) {}

  async resize(createImageDto: IRequestDTO): Promise<IResizedImageDTO> {
    const imageResizedData =
      await this.resizeImageProvider.resizeImageAndGetData(
        createImageDto.image,
        createImageDto.compress,
        createImageDto.blur,
      );

    const newImage = await this.metaDataRepository.create({
      metadata: imageResizedData.metadadata,
    });

    return imageResizedData;
  }

  async getImages(): Promise<Image[]> {
    return await this.metaDataRepository.getImages();
  }

  async getImageById(id: number): Promise<Image> {
    const image = await this.metaDataRepository.getImageById(id);
    const meta = image['metadata'][0];

    return meta['tags']['Model'];
  }
}
