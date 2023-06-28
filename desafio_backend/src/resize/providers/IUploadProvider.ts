export const IUPLOAD_PROVIDER = 'IUPLOAD_PROVIDER';

interface IUploadProvider {
  save(file: string, folder: string): Promise<string>;
}

export { IUploadProvider };
