import { Component, OnDestroy, OnInit } from "@angular/core";
import { FetchBusArrivalsService } from "../../services-buses/fetch-bus-arrivals.service";
import { BusArrival } from "../../model-buses/BusStop.model";
import { SelectedBusStopService } from "../../services-buses/selected-bus-stop.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-incoming-buses",
  templateUrl: "./incoming-buses.component.html",
  styleUrls: ["./incoming-buses.component.scss"],
})
export class IncomingBusesComponent implements OnInit, OnDestroy {
  busArrivalsData: BusArrival[] = [];
  busStopSelected: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fetchBusArrivalsService: FetchBusArrivalsService,
    private selectedBusStopService: SelectedBusStopService
  ) {}

  ngOnInit() {
    const selectedBusStopSub =
      this.selectedBusStopService.selectedBusStop.subscribe((id) => {
        if (id !== "") {
          this.busStopSelected = true;
          const fetchBusArrivalsSub = this.fetchBusArrivalsService
            .fetchBusArrivals(id)
            .subscribe((data) => {
              this.busArrivalsData = Object.values(data);
            });
          this.subscriptions.add(fetchBusArrivalsSub);
        } else {
          this.busStopSelected = false;
          this.busArrivalsData = [];
        }
      });
    this.subscriptions.add(selectedBusStopSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
