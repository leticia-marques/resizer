import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { IRequestDTO } from './dtos/IRequestDTO';
import { ResizeService } from './resize.service';

@Controller('images')
export class ResizeController {
  constructor(private readonly resizeImagesService: ResizeService) {}

  @Post()
  async resize(@Body() body: IRequestDTO) {
    const { image, compress } = body;

    if (!image || !compress)
      throw new HttpException(
        "The properties image and compression can't not be empty",
        400,
      );

    const response = await this.resizeImagesService.resize({
      image: image,
      compress: compress,
    });

    return response;
  }
}
