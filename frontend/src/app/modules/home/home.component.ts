import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  createUserForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  registrarUsuario(){
    this.authService.registrar(
      this.createUserForm.value.nickname,
      this.createUserForm.value.password
    ).subscribe(() => {
      alert("Usuário cadastrado com sucesso.")
      this.createUserForm.reset()
    })
  }

}
