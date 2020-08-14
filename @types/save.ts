export interface GameInfo {
  readonly id: string;
  name: string;
  isFavorite: boolean;
  tags: string[];
  hide: boolean;
}

export interface RootDirectoryInfo {
  absPath: string;
}
