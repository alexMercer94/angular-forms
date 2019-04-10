import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  user = {
    name: null,
    lastname: null,
    email: null,
    contry: '',
    sexo: 'Male',
    accept: false
  };

  pais = [
    {
      codigo: 'MEX',
      pais: 'México'
    },
    {
      codio: 'ESP',
      pais: 'España'
    }
  ];

  sexos: string[] = ['Hombre', 'Mujer', 'Sin definir'];

  constructor() {}

  ngOnInit() {}

  save(form: NgForm): void {
    console.log('save it!');
    console.log('NgForm', form);
    console.log('Form Value: ', form.value);
    console.log('user:', this.user);
  }
}
