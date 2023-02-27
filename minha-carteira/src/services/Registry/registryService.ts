import api from "../../api/axios";
import { IPostRegistryDTO } from "./dto/postRegistryDTO";
import { IPutRegistryDTO } from "./dto/putRegistryDTO";
import { IResultRegistryDTO } from "./dto/resultRegistryDTO";
import { IResultRegistryListDTO } from "./dto/resultRegistryListDTO";

const getRegistryById = async (
  id: string | undefined
): Promise<IResultRegistryDTO> => {
  try {
    const response = await api.get(`/v1/registry/${id}`);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

const getAllRegistry = async (
  userId: string
): Promise<IResultRegistryListDTO> => {
  try {
    const url = `/v1/registry?${userId}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

const getAllRegistryByMonthAndYear = async (
  userId: string,
  month: number,
  year: number
): Promise<IResultRegistryListDTO> => {
  try {
    const url = `/v1/registry?userId=${userId}&month=${month}&year=${year}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

const postRegistry = async ({
  description,
  amount,
  date,
  frequency,
  type,
  userId,
  obs,
}: IPostRegistryDTO): Promise<IResultRegistryDTO> => {
  try {
    const url = "/v1/registry";
    const payload = { description, amount, date, frequency, type, userId, obs };

    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

const putRegistry = async ({
  id,
  description,
  amount,
  date,
  frequency,
  type,
  userId,
  obs,
}: IPutRegistryDTO): Promise<IResultRegistryDTO> => {
  try {
    const url = "/v1/registry";
    const payload = {
      id,
      description,
      amount,
      date,
      frequency,
      type,
      userId,
      obs,
    };

    const response = await api.put(url, payload);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

const deleteRegistryById = async (id: string): Promise<IResultRegistryDTO> => {
  try {
    const response = await api.delete(`/v1/registry/${id}`);
    return response.data;
  } catch (error) {
    const data = {
      success: false,
      message: "internalError",
      hasErrors: true,
      data: undefined,
    };
    return data;
  }
};

export {
  getRegistryById,
  getAllRegistry,
  getAllRegistryByMonthAndYear,
  postRegistry,
  putRegistry,
  deleteRegistryById,
};
