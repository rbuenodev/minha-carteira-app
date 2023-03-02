export interface IPutRegistryDTO {
  id: number;
  description: string;
  amount: number | string;
  type: string;
  frequency: string;
  date: string;
  obs?: string;
  userId: number;
}
