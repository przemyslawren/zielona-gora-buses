import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BusStopNames } from "../model-buses/BusStop.model";
import { FetchBusStopsService } from "../services-buses/fetch-bus-stops.service";
import { LocalBusStorageService } from "../services-buses/local-bus-storage.service";
import { SelectedBusStopService } from "../services-buses/selected-bus-stop.service";

@Component({
  selector: "app-admin-panel-buses",
  templateUrl: "./admin-panel-buses.component.html",
  styleUrls: ["./admin-panel-buses.component.scss"],
})
export class AdminPanelBusesComponent implements OnInit {
  busStops: BusStopNames = [];

  defaultBusStopForm!: FormGroup;

  constructor(
    private router: Router,
    private fetchBusStopsService: FetchBusStopsService,
    private selectedBusStopService: SelectedBusStopService,
    private localBusStorageService: LocalBusStorageService
  ) {}

  ngOnInit(): void {
    this.fetchBusStopsService
      .fetchBusStops()
      .subscribe((busStops) => (this.busStops = Object.values(busStops)));

    this.defaultBusStopForm = new FormGroup({
      defaultBusStop: new FormControl(
        this.localBusStorageService.getData("selectedBusStop") || null,
        Validators.required
      ),
    });
  }

  onSubmit() {
    this.selectedBusStopService.updateSelectedBusStop(
      this.defaultBusStopForm.value.defaultBusStop
    );

    this.localBusStorageService.saveData(
      "selectedBusStop",
      this.defaultBusStopForm.value.defaultBusStop
    );
    this.router.navigate([""]);
  }
}
