import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistorialListComponent } from './historial-list/historial-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TryArrayPipe } from './try-array.pipe';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HistorialListComponent,
    TryArrayPipe,
    HistoryEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
