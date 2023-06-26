import * as Jimp from 'jimp';
import { IResizeImageProvider } from './IResizeImageProvider';
import { IResizedImageDTO } from '../dtos/IResizeImageDTO';
import path = require('path');
import { HttpException, Injectable } from '@nestjs/common';

interface resizeAndSaveParameters {
  height: number;
  width: number;
  metadata: Jimp;
  compressionValue: number;
  name: string;
}
@Injectable()
export class ResizeImageProvider implements IResizeImageProvider {
  resizeImageData: IResizedImageDTO;
  resizeAndSaveImage(
    height: number,
    width: number,
    metadata: Jimp,
    compressionValue: number,
    name: string,
  ): void {
    metadata
      .write(`src/images/original/${name}.${metadata.getExtension()}`)
      .quality(compressionValue)
      .resize(width, height)
      .write(`src/images/resized/${name}_thumb.${metadata.getExtension()}`);
  }

  async resizeImageAndGetData(
    imageUrl: string,
    compressionValue: string,
  ): Promise<IResizedImageDTO> {
    if (parseFloat(compressionValue) < 0 || parseFloat(compressionValue) > 100)
      throw new HttpException('Compress value must be between 0-100', 400);
    try {
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
          .quality(parseFloat(compressionValue))
          .write(`src/images/resized/${name}_thumb.${metadata.getExtension()}`);
      } else if (width <= height) {
        this.resizeAndSaveImage(
          720,
          newDimension,
          metadata,
          parseFloat(compressionValue),
          name,
        );
      } else {
        this.resizeAndSaveImage(
          newDimension,
          720,
          metadata,
          parseFloat(compressionValue),
          name,
        );
      }

      this.resizeImageData = {
        localpath: {
          original: imageUrl,
          thumb: `images/resized/${name}_thumb.${metadata.getExtension()}`,
        },
        metadadata: metadata['_exif'],
      };

      return this.resizeImageData;
    } catch (err) {
      throw new HttpException('Failed to resize image', 500);
    }
  }
}
