import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  ngOnInit() {
    this.registerForma.valueChanges.subscribe(value => console.log(value));
  }

  registerForma = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/(?:[a-zA-Z]+)*$/), Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&])/)]], // (/^(?=.^[a-z])(?=.^[A-Z])[0-9a-zA-Z]{8,}$/)] //^(?=[a-z])(?=[A-Z])[0-9a-zA-Z]{8,}$

    confirmPassword: ['', [Validators.required]],
  }, { validator: this.passwordMatchValidator });

  constructor(private fb: FormBuilder) {}

  get fullName() {
    return this.registerForma.controls['fullName']
  }

  get email() {
    return this.registerForma.controls['email'];
  }

  get password() {
    return this.registerForma.controls['password'];
  }

  get confirmPassword() {
    return this.registerForma.controls['confirmPassword'];
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    if (password && confirmPassword) {
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  
    return null; // Si uno de los campos está vacío, no aplicar la validación
  }
}