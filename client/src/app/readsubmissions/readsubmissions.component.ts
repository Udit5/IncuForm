import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-readsubmissions',
  templateUrl: './readsubmissions.component.html',
  styleUrls: ['./readsubmissions.component.css'],
})
export class ReadsubmissionsComponent implements OnInit {
  startup;

  constructor(
    private regService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    this.regService.getview(id).subscribe((data: any[]) => {
      console.log(data);
      this.startup = data;
    });
  }
}
