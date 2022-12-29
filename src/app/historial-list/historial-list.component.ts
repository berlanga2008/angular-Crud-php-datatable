import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
@Component({
  selector: 'app-historial-list',
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.css'],
})
export class HistorialListComponent implements OnInit {
  Historial: any = [];
  constructor(public restApi: RestApiService) {}
  ngOnInit() {
    this.loadHistorials();
  }
  // Get historials list
  loadHistorials() {
    return this.restApi.getHistorials().subscribe((data: {}) => {
      console.log(data);
      this.Historial = data;
    });
  }
  // Delete historial
  deleteHistorial(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteHistorial(id).subscribe((data) => {
        this.loadHistorials();
      });
    }
  }
}
