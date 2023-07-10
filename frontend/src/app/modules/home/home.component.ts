import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormValidatorService } from 'src/app/shared/services/validators/form-validator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fotosAvatares: string[] = [];
  isSelecaoAvatar: boolean = false;
  isUsuarioLogado: boolean;
  dadosJogadorLogado: Jogador;
  sexoAvatar: SelectItem[];
  sexoAvatarEscolhido: string = 'masculino';

  criacaoUsuarioForm = this.fb.group({
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    sexoAvatar: ['', [Validators.required]],
    avatar: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private formValidator: FormValidatorService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getArquivosFotosAvatares(this.sexoAvatarEscolhido);

    this.sexoAvatar = [
      {label: 'Masculino', value: 'masculino'},
      {label: 'Feminino', value: 'feminino'}
    ];

    this.authService.usuarioLogado.subscribe(jogador => {
      this.dadosJogadorLogado = jogador;
      this.isUsuarioLogado = !!jogador;
      console.log(this.dadosJogadorLogado);
    });
  }

  possuiErro(nomeCampo: string){
    return this.formValidator.possuiErro(this.criacaoUsuarioForm, nomeCampo)
  }

  registrarUsuario(){
    if(!this.isSelecaoAvatar){
      this.isSelecaoAvatar = true;
    } else {
      this.authService.registrar(
        this.criacaoUsuarioForm.value.nickname,
        this.criacaoUsuarioForm.value.password,
        this.criacaoUsuarioForm.value.avatar
      ).subscribe(() => {
        this.messageService.add({
          severity:'success',
          summary:'Cadastro Realizado',
          detail:'Usuário cadastrado com sucesso.'
        });

        this.isSelecaoAvatar = false;
        this.criacaoUsuarioForm.reset();
      });
    }
  }

  getArquivosFotosAvatares(sexoAvatarEscolhido: string){
    this.fotosAvatares = [];
    this.sexoAvatarEscolhido = sexoAvatarEscolhido;
    for(let i = 1; i <= 10; i++){
        if(sexoAvatarEscolhido === 'masculino'){
          this.fotosAvatares.push(`homem_avatar${i}.png`);
        } else {
          this.fotosAvatares.push(`mulher_avatar${i}.png`);
        }
    }
  }

}
