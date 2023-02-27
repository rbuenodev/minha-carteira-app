export interface IResultRegistryListDTO {
  data: IResultRegistryData[] | undefined;
  success: boolean;
  message: string;
  hasErrors: boolean;
}

interface IResultRegistryData {
  id: number;
  description: string;
  amount: number;
  type: string;
  frequency: string;
  date: string;
  obs?: string;
  userId: number;
  userName: string;
}
