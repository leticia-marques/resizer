import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ResizeImageProvider } from './providers/ResizeImageProvider';
import { IRequestDTO } from './dtos/IRequestDTO';
import { ResizeService } from './resize.service';
import { resolveNaptr } from 'dns';

@Controller('images')
export class ResizeController {
  constructor(private resizeImagesService: ResizeService) {}

  @Post()
  async create(@Body() body: IRequestDTO) {
    const { image, compress } = body;
    if (!image || !compress)
      throw new HttpException(
        "The properties image and compression can't not be empty",
        400,
      );
    const response = await this.resizeImagesService.create({
      image: image,
      compress: compress,
    });

    return response;
  }
}
