export interface GameGroup {
  id: string;
  name: string;
  games: Game[];
}

export interface Game {
  name: string;
  absPath: string;
  fav: boolean;
  tags: string[];
}
