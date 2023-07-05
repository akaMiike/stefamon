import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormValidatorService } from 'src/app/shared/services/validators/form-validator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  criacaoUsuarioForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private formValidator: FormValidatorService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  possuiErro(nomeCampo: string){
    return this.formValidator.possuiErro(this.criacaoUsuarioForm, nomeCampo)
  }

  registrarUsuario(){
    this.authService.registrar(
      this.criacaoUsuarioForm.value.nickname,
      this.criacaoUsuarioForm.value.password
    ).subscribe(() => {
      this.messageService.add({
        severity:'success',
        summary:'Cadastro Realizado',
        detail:'Usuário cadastrado com sucesso.'
      })
      
      this.criacaoUsuarioForm.reset()
    })
  }

}
