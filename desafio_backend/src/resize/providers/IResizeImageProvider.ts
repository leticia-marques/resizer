import { IResizedImageDTO } from '../dtos/IResizeImageDTO';

export const RESIZE_IMAGE = 'RESIZE_IMAGE';
export interface IResizeImageProvider {
  resizeImageAndGetData(
    imageUrl: string,
    compressionValue: string,
  ): Promise<IResizedImageDTO>;
}
