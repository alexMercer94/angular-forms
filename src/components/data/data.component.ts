import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  form: FormGroup;
  user = {
    fullName: {
      name: 'Alex',
      lastname: 'Mercer'
    },
    email: 'alex@gmail.com'
    /* hobbies: ['run', 'sleep', 'eat'] */
  };

  constructor() {
    console.log(this.user);
    this.form = new FormGroup({
      fullName: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl('', [Validators.required, this.validation])
      }),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      hobbies: new FormArray([new FormControl('run', Validators.required)]),
      username: new FormControl('', Validators.required, this.existUser),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    /* this.form.setValue(this.user); */
    this.form.controls[`password2`].setValidators([Validators.required, this.noIgual.bind(this.form)]);

    this.form.controls[`username`].valueChanges.subscribe(data => console.log(data));
    this.form.controls[`username`].statusChanges.subscribe(data => console.log(data));
  }

  ngOnInit() {}

  saveChanges(): void {
    console.log(this.form.value);
    console.log(this.form);
    /* this.form.reset({
      fullName: {
        name: '',
        lastname: ''
      },
      email: ''
    }); */
  }

  addHobbie() {
    (this.form.controls[`hobbies`] as FormArray).push(new FormControl('', Validators.required));
  }

  validation(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'mercer') {
      return {
        noLastname: true
      };
    }

    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    const form: any = this;
    if (control.value !== form.controls[`password1`].value) {
      return {
        noiguales: true
      };
    }

    return null;
  }

  existUser(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ exist: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });

    return promise;
  }
}
