import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResizeController } from './resize/resize.controller';
import { ImagesModule } from './resize/resize.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/desafio'),
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
