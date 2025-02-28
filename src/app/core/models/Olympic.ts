import {IParticipation} from "./Participation";

export  interface IOlympicCountry {
  id:string;
  country:string;
  participations: IParticipation[];
}
