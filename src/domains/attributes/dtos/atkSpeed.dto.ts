import {ItemsDto} from './items.dto';
import {BuffDto} from './buffDto';
import {EmblemsDto} from './emblems.dto';

export interface AtkSpeedDto {
  buffs?: BuffDto[];
  items?: ItemsDto[];
  emblems?: EmblemsDto;
  additionalBuff?: number;
}
