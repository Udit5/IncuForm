import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegformComponent } from './regform/regform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ReadsubmissionsComponent } from './readsubmissions/readsubmissions.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegformComponent,
    SubmissionsComponent,
    ReadsubmissionsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
