declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  executeGame: (filePath: string) => Promise<void>;
  /**
   * Load games and execute game.
   * @param gameId Game id.
   */
  playGame: (gameId: string) => void;
  /**
   * Load root directories.
   */
  loadRootDirectories: () => RootDirectoryInfo[];
  /**
   * Load games.
   */
  loadGames: () => GameInfo[];
  /**
   * Scan games from root directories and save them.
   */
  scanGames: () => Promise<GameInfo[]>;
  /**
   * Save root directories.
   * @param roots Root directory infos.
   */
  saveRootDirectories: (roots: RootDirectoryInfo[]) => void;
  /**
   * Update existing games info.
   * @param games Updating games.
   */
  updateGames: (games: GameInfo[]) => GameInfo[];
}
