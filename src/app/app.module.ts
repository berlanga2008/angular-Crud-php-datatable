import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistorialListComponent } from './historial-list/historial-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TryArrayPipe } from './try-array.pipe';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HistorialListComponent,
    TryArrayPipe,
    HistoryEditComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
