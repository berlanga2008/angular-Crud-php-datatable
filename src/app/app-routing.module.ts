import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialListComponent } from './historial-list/historial-list.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/historial-list' },
  { path: 'historial-list', component: HistorialListComponent },
  { path: 'history-edit/:id', component: HistoryEditComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
