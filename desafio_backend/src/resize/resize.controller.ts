import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { IRequestDTO } from './dtos/IRequestDTO';
import { ResizeService } from './resize.service';

@Controller('image/save')
export class ResizeController {
  constructor(private readonly resizeImagesService: ResizeService) {}

  @Post()
  async resize(@Body() body: IRequestDTO) {
    const { image, compress, blur } = body;

    if (!image || !compress)
      throw new HttpException(
        {
          errors: [
            {
              code: 400,
              message:
                "The properties image and compression can't not be empty",
            },
          ],
        },
        400,
      );
    const response = await this.resizeImagesService.resize({
      image: image,
      compress: compress,
      blur: blur,
    });

    return response;
  }

  @Get()
  async getImages() {
    return await this.resizeImagesService.getImages();
  }

  @Get(':id')
  async getImagesById(@Param('id') id: number) {
    return await this.resizeImagesService.getImageById(id);
  }
}
