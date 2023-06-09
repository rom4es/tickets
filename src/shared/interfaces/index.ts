export interface IPlaceDto {
  row: number;
  place: number;
  price: number;
  booked: boolean;
}

export interface IPlace extends IPlaceDto {
  selected: boolean;
}