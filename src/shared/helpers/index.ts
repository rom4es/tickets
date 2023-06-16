import { COLOR_BOOKED } from "../constants";
import { Colors, IPlace } from "../interfaces";

export const getColor = (place: IPlace, colors: Colors) => {
  return place.booked ? COLOR_BOOKED : colors.get(place.price);
}