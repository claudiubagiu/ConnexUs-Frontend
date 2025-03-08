export interface Image {
    id: string;
    filename: string;
    fileDescription?: string;
    fileExtension: string;
    fileSizeInBytes: number;
    filePath: string;
    file: File;
}