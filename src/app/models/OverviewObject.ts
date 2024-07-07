import { MapObject } from './MapObject';
import { PesticideCategory } from './PesticideCategory';

export interface OverviewObject {
  field: MapObject;
  allPesticides: PesticideCategory[];
}
