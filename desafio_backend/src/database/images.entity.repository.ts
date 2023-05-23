import { Document, Model } from 'mongoose';
import { Image } from 'src/resize/entities/image.entity';

export abstract class ImageEntityRepository<T extends Document> {
  constructor(protected readonly imageEntityModel: Model<Image>) {}

  async create(metadata: { metadata: object }): Promise<Image> {
    const imageMetaDataModel = new this.imageEntityModel(metadata);
    return imageMetaDataModel.save();
  }
}
