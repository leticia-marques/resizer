import { IResizedImageDTO } from 'src/resize/dtos/IResizeImageDTO';

export const imagesSampleData = (): IResizedImageDTO => {
  return {
    localpath: {
      original: 'testPath/testImage.jpg',
      thumb: 'testFolder/testImage_thumb.jpg',
    },
    metadadata: {
      someMetaDataValues: ['Test1', 'Test2'],
      otherMetaDataValues: { test: 'Test1' },
    },
  };
};
