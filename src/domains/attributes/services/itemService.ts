import {get} from "../../../infraestructure/adapters/http.adapter";
import {ItemRoutesEnum} from "../enums/itemRoutes.enum";

export const getItemsNames = async (): Promise<string[]> => {
  const response = await get<string[]>(
    ItemRoutesEnum.names
  );
  return response.data;
};
