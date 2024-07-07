import { DroneObject } from './DroneObject';

export interface MapObject {
  mapTitle: string;
  fieldId: number;
  drones: DroneObject[];
}
