import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class LocalPath {
  @Prop()
  original: string;
  @Prop()
  thumb: string;
}

@Schema()
export class Image {
  @Prop()
  metadata: [object];
}

export const ImageSchema = SchemaFactory.createForClass(Image);
