import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BusArrivals } from "../model-buses/BusStop.model";

@Injectable({
  providedIn: "root",
})
export class FetchBusArrivalsService {
  constructor(private http: HttpClient) {}

  fetchBusArrivals(id: string): Observable<BusArrivals> {
    return this.http.get<BusArrivals>(
      `https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/stops/${id}/departures`
    );
  }
}
