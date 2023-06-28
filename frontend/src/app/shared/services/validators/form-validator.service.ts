import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  possuiErro(form: FormGroup, formControlName: string): boolean {
    const field = form.get(formControlName);
    return !!(field?.invalid && (field.touched || field.dirty));
  }
}
