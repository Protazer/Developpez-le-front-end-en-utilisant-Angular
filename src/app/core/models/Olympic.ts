import { IParticipation } from './Participation';

export interface IOlympicCountry {
  id: number;
  country: string;
  participations: IParticipation[];
}
