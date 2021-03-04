import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lookup-password',
  templateUrl: './lookup-password.component.html',
  styleUrls: ['./lookup-password.component.scss'],
})
export class LookupPasswordComponent implements OnInit {
  lookuppwForm: FormGroup;

  constructor() {
    this.lookuppwForm = new FormGroup({
      uid: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onLookupPwSubmit() {}

  clearForm() {
    this.lookuppwForm.reset();
  }
}
