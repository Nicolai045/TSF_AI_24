import { DroneStatus } from './DroneStatus';

export interface DroneObject {
  name: string;
  id: number;
  isActive: boolean;
  status: DroneStatus;
  loadingState?: number;
}
