import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { JogadorService } from 'src/app/shared/services/jogador.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  createUserForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private jogadorService: JogadorService
  ) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.jogadorService.register(
      this.createUserForm.value.nickname,
      this.createUserForm.value.password
    ).subscribe(() => {
      alert("Usuário cadastrado com sucesso.")
    })
  }

}
