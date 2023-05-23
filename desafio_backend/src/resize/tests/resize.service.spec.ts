import { Test } from '@nestjs/testing';
import { ResizeService } from '../resize.service';
import {
  IResizeImageProvider,
  RESIZE_IMAGE,
} from '../providers/IResizeImageProvider';

import { ResizeImageProvider } from '../providers/ResizeImageProvider';
import { databaseReturn } from './sampleData/databaseReturn';
import { ImageRepository } from '../imageMetadata.repository';
import { HttpException } from '@nestjs/common';
import { async } from 'rxjs';

describe('Resize service', () => {
  let resizeImageProvider: IResizeImageProvider;
  let resizeService: ResizeService;
  let imageRepository: ImageRepository;

  beforeEach(async () => {
    const mockResizeRepository = {
      create: jest.fn().mockReturnValue(databaseReturn()),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        ResizeService,
        {
          provide: RESIZE_IMAGE,
          useClass: ResizeImageProvider,
        },
        {
          provide: ImageRepository,
          useValue: mockResizeRepository,
        },
      ],
    }).compile();

    resizeImageProvider = moduleRef.get<IResizeImageProvider>(RESIZE_IMAGE);
    resizeService = moduleRef.get<ResizeService>(ResizeService);
    imageRepository = moduleRef.get<ImageRepository>(ImageRepository);
  });

  it('Should throw an failed to resize image error', () => {
    expect(async () => {
      await resizeService.resize({ image: 'test.jpg', compress: '5' });
    }).rejects.toEqual(new HttpException('Failed to resize image', 500));
  });

  it('Should throw an compress value is invalid error', () => {
    expect(async () => {
      await resizeService.resize({ image: 'teste.jpg', compress: '200' });
    }).rejects.toEqual(
      new HttpException('Compress value must be between 0-100', 400),
    );
  });
});
