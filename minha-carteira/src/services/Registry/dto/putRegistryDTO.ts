export interface IPutRegistryDTO {
  id: number;
  description: string;
  amount: number | undefined;
  type: string;
  frequency: string;
  date: string;
  obs?: string;
  userId: number;
}
