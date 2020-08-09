import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ReadsubmissionsComponent } from './readsubmissions/readsubmissions.component';
import { RegformComponent } from './regform/regform.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: RegformComponent },
  {
    path: 'submission',
    component: SubmissionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: ReadsubmissionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
