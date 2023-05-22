import * as Jimp from 'jimp';
import { IResizeImageProvider } from './IResizeImageProvider';
import { IResizedImageDTO } from '../dtos/IResizeImageDTO';
import path = require('path');
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ResizeImageProvider implements IResizeImageProvider {
  resizeImageData: IResizedImageDTO;
  async resize(
    imageUrl: string,
    compressionValue: string,
  ): Promise<IResizedImageDTO> {
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
      } else {
        metadata
          .write(`src/images/original/${name}.${metadata.getExtension()}`)
          .quality(parseFloat(compressionValue))
          .resize(newDimension, 720)
          .write(`src/images/resized/${name}_thumb.${metadata.getExtension()}`);
      }
      const newObject: IResizedImageDTO = {
        localpath: {
          original: imageUrl,
          thumb: `images/resized/${name}_thumb.${metadata.getExtension()}`,
        },
        metadadata: metadata['_exif'],
      };

      this.resizeImageData = newObject;
      return this.resizeImageData;
    } catch (err) {
      throw new HttpException('Failed to resize image', 500);
    }
  }
}
