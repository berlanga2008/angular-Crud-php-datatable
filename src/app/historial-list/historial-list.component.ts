import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Historial} from '../shared/historial';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-historial-list',
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.css'],
})
export class HistorialListComponent implements OnInit {
  public historials: any;
  public dtoptions: DataTables.Settings = {};
  public dtTrigger:Subject<any>=new Subject<any>();
  public historialsHeader :any;

  constructor(public restApi: RestApiService) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:false,
    };
    this.loadHistorials();
  }
  // Get historials list
  loadHistorials() {
    return this.restApi.getHistorials().subscribe((data: {}) => {
      console.log(data);
      this.historialsHeader = data;
      this.dtTrigger.next(null);
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
