import { makeAutoObservable } from 'mobx';
import { IEvent, IEventDto, IPlace, IPlaceDto } from '../shared/interfaces';
import { COLORS } from '../shared/constants';

class HallSchemeStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public loading = false;
  public events: IEvent[] = [];
  public places: IPlace[][] = [];
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

  public async fetchPlaces() {
    try {
      this.loading = true;

      if (this.activeEventId) {
        const response = await fetch(`./mocks/seats/${this.activeEventId}.json`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API request delay
        await response.json().then((places) => {
          this.setPlaces(places);
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  public async selectEvent(id: number) {
    const activeEvent = this.events.find((event) => event.selected);
    const targetEvent = this.events.find((event) => event.id === id);
    if (activeEvent === targetEvent) return;

    if (activeEvent) {
      activeEvent.selected = false;
    }

    if (targetEvent) {
      targetEvent.selected = true;
      await this.fetchPlaces();
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

  public setPlaces(places: IPlaceDto[][]) {
    this.places = places.map((row) =>
      row.map((place) => ({
        ...place,
        selected: false,
      }))
    );

    const colors = [...COLORS];
    this.colors.clear();

    places.forEach((row) => {
      row.forEach((place) => {
        if (!this.colors.has(place.price)) {
          if (colors.length) {
            // TODO:
            this.colors.set(place.price, colors.shift() as string);
          }
        }
      });
    });
  }

  public choosePlace(row: number, place: number) {
    const rowIndex = row - 1;
    const placeIndex = place - 1;
    if (this.places[rowIndex][placeIndex] && !this.places[rowIndex][placeIndex].booked) {
      this.places[rowIndex][placeIndex].selected = !this.places[rowIndex][placeIndex].selected;
    }
  }

  // TODO:
  public removePlace(row: number, place: number) {
    const rowIndex = row - 1;
    const placeIndex = place - 1;
    if (this.places[rowIndex][placeIndex] && !this.places[rowIndex][placeIndex].booked) {
      this.places[rowIndex][placeIndex].selected = false;
    }
  }

  public get selectedPlaces() {
    const list: IPlace[] = [];

    this.places.forEach((row) => {
      list.push(...row.filter((place) => place.selected));
    });

    return list;
  }

  public get totalPrice() {
    let price = 0;

    this.places.forEach((row) => {
      price += row.filter((place) => place.selected).reduce((sum, place) => sum + place.price, 0);
    });

    return price;
  }

  public deInit() {
    this.loading = false;
    this.events = [];
    this.places = [];
    this.colors.clear();
  }
}

export default new HallSchemeStore();
