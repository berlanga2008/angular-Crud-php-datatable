import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  historialData: any;
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }
  ngOnInit() {
    this.restApi.getHistorial(this.id).subscribe((data: {}) => {
      this.historialData = data;
    })
  }
  // Update employee data
  updateHistory() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateHistorial(this.id, this.historialData).subscribe(data => {
        this.router.navigate(['/historial-list'])
      })
    }
  }
}


