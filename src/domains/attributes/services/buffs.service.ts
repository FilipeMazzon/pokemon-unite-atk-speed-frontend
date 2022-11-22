import {BuffsRoutesEnum} from "../enums/buffsRoutes.enum";
import {get} from "../../../infraestructure/adapters/http.adapter";

export const getGenericBuffs = async (): Promise<string[]> => {
  const response = await get<string[]>(
    BuffsRoutesEnum.buffs
  );
  return response.data;
};
