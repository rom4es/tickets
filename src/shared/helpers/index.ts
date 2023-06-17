import { COLOR_BOOKED } from "../constants";
import { Colors, ISeat } from "../interfaces";

export const getColor = (seat: ISeat, colors: Colors) => {
  return seat.booked ? COLOR_BOOKED : colors.get(seat.price);
}