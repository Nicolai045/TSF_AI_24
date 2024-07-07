export interface PesticideObject {
  name: string;
  id: number;
  stockValue: string;
  allowedForField: number[];
  currentStatus?: boolean;
}
