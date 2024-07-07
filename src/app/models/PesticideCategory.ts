import { PesticideObject } from './PesticideObject';

export interface PesticideCategory {
  name: string;
  id: number;
  pesticides: PesticideObject[];
}
