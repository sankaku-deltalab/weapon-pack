import { GameInfo } from "../@types/save";

export interface GameGroup {
  id: string;
  name: string;
  games: GameInfo[];
}
