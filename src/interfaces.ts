export interface GameGroup {
  id: string;
  name: string;
  games: Game[];
}

export interface Game {
  name: string;
  path: string;
  fav: boolean;
  tags: string[];
}
