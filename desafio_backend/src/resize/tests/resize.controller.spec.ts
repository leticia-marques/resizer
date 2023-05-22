import { Test } from '@nestjs/testing';
import { ResizeController } from '../resize.controller';
import { ResizeService } from '../resize.service';
import { imagesSampleData } from './sampleData/imageMetadata';
import { HttpException } from '@nestjs/common';

describe('Resize controller', () => {
  let resizeController: ResizeController;
  let resizeService: ResizeService;

  beforeEach(async () => {
    const mockResizeService = {
      resize: jest.fn().mockReturnValue(imagesSampleData()),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ResizeController],
      providers: [
        {
          provide: ResizeService,
          useValue: mockResizeService,
        },
      ],
    }).compile();

    resizeController = moduleRef.get<ResizeController>(ResizeController);
    resizeService = moduleRef.get<ResizeService>(ResizeService);
  });

  describe('resize', () => {
    it('Should create an object with the images info', async () => {
      const newImageData = await resizeController.resize({
        image: 'example.jpg',
        compress: '5',
      });
      console.log(newImageData);
      expect(resizeService.resize).toBeCalledWith({
        image: 'example.jpg',
        compress: '5',
      });
      expect(newImageData).toEqual(imagesSampleData());
    });
  });

  it('Should throw a missing property error', async () => {
    expect(async () => {
      await resizeController.resize({
        image: 'teste.jpg',
        compress: '',
      });
    }).rejects.toEqual(
      new HttpException(
        "The properties image and compression can't not be empty",
        400,
      ),
    );
  });
});
