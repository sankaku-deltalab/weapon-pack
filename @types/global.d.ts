declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  readDir: () => Promise<string[]>;
  save: (str: string) => void;
}
