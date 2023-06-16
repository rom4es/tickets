export interface IPlaceDto {
  row: number;
  place: number;
  price: number;
  booked: boolean;
}

export interface IPlace extends IPlaceDto {
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