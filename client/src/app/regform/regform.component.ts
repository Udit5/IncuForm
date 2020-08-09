import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css'],
})
export class RegformComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  success = false;

  countries: Array<string> = ['India'];

  city: Array<string> = ['Jaipur', 'Mumbai', 'Hyderabad'];

  companyType: Array<string> = ['Shared', 'Single owner', 'foundation'];

  policies: Array<string> = [
    'Adhering to Policies',
    'Commited to the organization',
    'others',
  ];

  selectedPolicies = [];
  errorselectpolicy = true;
  hideElement = false;

  constructor(
    private registrationService: RegistrationService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      company_name: ['', Validators.required],
      website_url: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      fund_raised: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      company_type: ['', Validators.required],
      company_est: ['', Validators.required],
      isWorking: [false, Validators.required],
      co_first_name: [''],
      co_last_name: [''],
      co_email: ['', Validators.email],
      co_phone: ['', Validators.pattern('^[0-9]*$')],
      emp_count: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      company_description: ['', Validators.required],
      commited_to: new FormArray([]),
      estimated_cost: ['', Validators.required],
      revenue_stream: ['', Validators.required],
      collabration: ['', Validators.required],
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.registerForm.get(
      'commited_to'
    ) as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  get h() {
    return this.registerForm.controls;
  }

  show(cf) {
    this.hideElement = cf;
    console.log(this.hideElement);
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.registrationService.register(this.registerForm.value).subscribe(() => {
      this.success = true;
      this.submitted = false;
      this.registerForm.reset();
    });

    console.table(this.registerForm.value);
  };
}
