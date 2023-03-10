import { UserConfig } from 'vite';

export interface IUserConfig extends UserConfig {
  clearCache?: boolean;
}
