import { Component, Input } from "@angular/core";
import { BusStopNames } from "../../model-buses/BusStop.model";
import { SelectedBusStopService } from "../../services-buses/selected-bus-stop.service";

@Component({
  selector: "app-list-of-buses",
  templateUrl: "./list-of-buses.component.html",
  styleUrls: ["./list-of-buses.component.scss"],
})
export class ListOfBusesComponent {
  @Input() busStops!: BusStopNames;

  constructor(
    private selectedBusStopService: SelectedBusStopService
  ) {}

  ngOnInit() {}

  onClick(id: string) {
    this.selectedBusStopService.updateSelectedBusStop(id);
  }
}
