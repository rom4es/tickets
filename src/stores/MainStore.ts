import { makeAutoObservable } from 'mobx';
import { IEvent, IEventDto, ISeat, ISeatDto } from '../shared/interfaces';
import { COLORS } from '../shared/constants';

class HallSchemeStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public loading = false;
  public events: IEvent[] = [];
  public seats: ISeat[][] = [];
  public colors: Map<number, string> = new Map();

  public async fetchEvents() {
    try {
      const response = await fetch('./mocks/events.json');
      await response.json().then((events) => {
        this.setEvents(events);
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  public async fetchSeats() {
    try {
      this.loading = true;

      if (this.activeEventId) {
        const response = await fetch(`./mocks/seats/${this.activeEventId}.json`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API request delay
        await response.json().then((seats) => {
          this.setSeats(seats);
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  public async selectEvent(id: number) {
    if (this.loading) return;

    const activeEvent = this.events.find((event) => event.selected);
    const targetEvent = this.events.find((event) => event.id === id);
    if (activeEvent === targetEvent) return;

    if (activeEvent) {
      activeEvent.selected = false;
    }

    if (targetEvent) {
      targetEvent.selected = true;
      await this.fetchSeats();
    }
  }

  public get activeEventId() {
    const activeEvent = this.events.find((event) => event.selected);
    if (!activeEvent) return null;
    return activeEvent.id;
  }

  public setEvents(events: IEventDto[]) {
    this.events = events.map((event) => ({
      ...event,
      selected: false,
    }));

    if (this.events.length) {
      this.events[0].selected = true;
    }
  }

  public setSeats(seats: ISeatDto[][]) {
    this.seats = seats.map((row) =>
      row.map((seat) => ({
        ...seat,
        selected: false,
      }))
    );

    const colors = [...COLORS];
    this.colors.clear();

    seats.forEach((row) => {
      row.forEach((seat) => {
        if (!this.colors.has(seat.price)) {
          this.colors.set(seat.price, colors.length ? (colors.shift() as string) : COLORS[0]);
        }
      });
    });
  }

  public chooseSeat(row: number, seat: number) {
    const rowIndex = row - 1;
    const seatIndex = seat - 1;
    if (this.seats[rowIndex][seatIndex] && !this.seats[rowIndex][seatIndex].booked) {
      this.seats[rowIndex][seatIndex].selected = !this.seats[rowIndex][seatIndex].selected;
    }
  }

  public removeSeat(row: number, seat: number) {
    const rowIndex = row - 1;
    const seatIndex = seat - 1;
    if (this.seats[rowIndex][seatIndex] && !this.seats[rowIndex][seatIndex].booked) {
      this.seats[rowIndex][seatIndex].selected = false;
    }
  }

  public get selectedSeats() {
    const list: ISeat[] = [];

    this.seats.forEach((row) => {
      list.push(...row.filter((seat) => seat.selected));
    });

    return list;
  }

  public get totalPrice() {
    let price = 0;

    this.seats.forEach((row) => {
      price += row.filter((seat) => seat.selected).reduce((sum, seat) => sum + seat.price, 0);
    });

    return price;
  }

  public deInit() {
    this.loading = false;
    this.events = [];
    this.seats = [];
    this.colors.clear();
  }
}

export default new HallSchemeStore();
