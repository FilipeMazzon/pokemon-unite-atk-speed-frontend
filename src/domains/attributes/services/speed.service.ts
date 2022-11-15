import {post} from "../../../infraestructure/adapters/http.adapter";
import {AtkSpeedDto} from "../dtos/atkSpeed.dto";
import {AtkSpeedRoutesEnum} from "../enums/atkSpeedRoutes.enum";

export const getAtkSpeed = async (pokemon: string, dto: AtkSpeedDto = {}): Promise<number[]> => {
  const response = await post<AtkSpeedDto, number[]>(
    `${AtkSpeedRoutesEnum.atkSpeed}/${pokemon}`, dto,
  );
  return response.data;
};
