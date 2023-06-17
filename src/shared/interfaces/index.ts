export interface ISeatDto {
  row: number;
  seat: number;
  price: number;
  booked: boolean;
}

export interface ISeat extends ISeatDto {
  selected: boolean;
}

export interface IEventDto {
  id: number;
  hall: string;
  date: string;
  seats: number;
}

export interface IEvent extends IEventDto {
  selected: boolean;
}

export type Colors = Map<number, string>;