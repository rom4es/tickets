import { makeAutoObservable } from 'mobx';
import { IPlace, IPlaceDto } from '../shared/interfaces';

class HallSchemeStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public loading = false;
  public places: IPlace[][] = [];

  public async fetchPlaces() {
    try {
      this.loading = true;

      const response = await fetch('./mocks/scheme.json');
      await response.json().then((places) => {
        this.setPlaces(places);
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  public setPlaces(places: IPlaceDto[][]) {
    this.places = places.map((row) =>
      row.map((place) => ({
        ...place,
        selected: false,
      }))
    );
  }

  public deInit() {
    this.loading = false;
    this.places = [];
  }
}

export default new HallSchemeStore();
