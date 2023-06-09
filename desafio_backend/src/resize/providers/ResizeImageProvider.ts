import * as Jimp from 'jimp';
import { IResizeImageProvider } from './IResizeImageProvider';
import { IResizedImageDTO } from '../dtos/IResizeImageDTO';
import path = require('path');
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IUPLOAD_PROVIDER, IUploadProvider } from './IUploadProvider';

@Injectable()
export class ResizeImageProvider implements IResizeImageProvider {
  constructor(
    @Inject(IUPLOAD_PROVIDER) private readonly s3upload: IUploadProvider,
  ) {}
  resizeImageData: IResizedImageDTO;
  async sendToS3(filepath: string, folder: string): Promise<void> {
    await this.s3upload.save(filepath, folder);
  }

  async resizeAndSaveImage(
    height: number,
    width: number,
    metadata: Jimp,
    compressionValue: number,
    name: string,
    blur: number,
  ): Promise<void> {
    const extension = metadata.getExtension();
    metadata
      .write(`src/images/original/${name}.${extension}`)
      .quality(compressionValue)
      .resize(width, height)
      .blur(blur)
      .write(`src/images/resized/${name}_thumb.${extension}`);

    await this.sendToS3(`src/images/original/${name}.${extension}`, 'original');
    await this.sendToS3(
      `src/images/resized/${name}_thumb.${extension}`,
      'resized',
    );
  }

  async resizeImageAndGetData(
    imageUrl: string,
    compressionValue: number,
    blur?: number,
  ): Promise<IResizedImageDTO> {
    if (compressionValue < 0 || compressionValue > 1)
      throw new HttpException(
        {
          errors: [
            {
              code: 400,
              message: 'Compress value must be between 0-1',
            },
          ],
        },
        400,
      );

    try {
      blur = blur > 1 || blur < 0 || !blur ? 1 : blur * 100;

      const metadata = await Jimp.read(imageUrl);

      const name = path.parse(imageUrl).name;
      const height = metadata.getHeight();
      const width = metadata.getWidth();

      const largerDimension =
        width > height || width == height ? width : height;

      let proportion =
        width > height || width == height ? width / height : height / width;
      const proportionStr = proportion.toString().substring(0, 4);
      proportion = parseFloat(proportionStr);

      const newDimension = 720 / proportion;

      if (largerDimension < 720) {
        metadata
          .quality(compressionValue)
          .blur(blur)
          .write(`src/images/resized/${name}_thumb.${metadata.getExtension()}`);

        await this.sendToS3(
          `src/images/resized/${name}_thumb.${metadata.getExtension()}`,
          'resized',
        );
      } else if (width <= height) {
        await this.resizeAndSaveImage(
          720,
          newDimension,
          metadata,
          compressionValue * 100,
          name,
          blur,
        );
      } else {
        await this.resizeAndSaveImage(
          newDimension,
          720,
          metadata,
          compressionValue * 100,
          name,
          blur,
        );
      }

      this.resizeImageData = {
        localpath: {
          original: `src/images/original/${name}.${metadata.getExtension()}`,
          thumb: `images/resized/${name}_thumb.${metadata.getExtension()}`,
        },
        metadadata: metadata['_exif'],
      };
      return this.resizeImageData;
    } catch (err) {
      throw new HttpException(
        {
          errors: [
            {
              code: 500,
              message: 'invalid url',
            },
          ],
        },
        500,
      );
    }
  }
}
