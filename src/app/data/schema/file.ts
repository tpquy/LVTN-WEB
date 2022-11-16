import { FileMimeType } from './file-mime-type';

export class File {
    id: number;
    path: string;
    size?: number;
    updatedDate?: Date;
    fileName?: string;
    fileMimeType?: FileMimeType;
}
