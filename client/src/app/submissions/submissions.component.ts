import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { StartUp } from '../model/startup';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css'],
})
export class SubmissionsComponent implements OnInit {
  startups: any[];
  view;

  constructor(private regService: RegistrationService) {}

  ngOnInit(): void {
    this.regService.getdata().subscribe((data: any[]) => {
      this.startups = data;
    });
  }

  getView(id) {
    this.regService.getview(id).subscribe((data: any) => {
      this.view = data;
      console.log(this.view);
    });
  }
}
