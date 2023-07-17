import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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
  private readonly INDICE_AVATAR_INICIAL = 0;
  private readonly SEXO_AVATAR_INICIAL = 'masculino';

  fotosAvatares: string[] = [];
  isSelecaoAvatar: boolean = false;
  isUsuarioLogado: boolean;
  dadosJogadorLogado: Jogador;
  sexoAvatar: SelectItem[];
  indiceAvatarAtual = 0;

  mostrarModalHistoricoBatalha = false;

  criacaoUsuarioForm = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    sexoAvatar: ['', [Validators.required]],
    avatar: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formValidator: FormValidatorService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getArquivosFotosAvatares(this.SEXO_AVATAR_INICIAL);
    this.setAvatarAtual(this.INDICE_AVATAR_INICIAL);

    this.sexoAvatar = [
      {label: 'Masculino', value: 'masculino'},
      {label: 'Feminino', value: 'feminino'}
    ];

    this.authService.usuarioLogado.subscribe(jogador => {
      this.dadosJogadorLogado = jogador;
      this.isUsuarioLogado = !!jogador;
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
    this.setAvatarAtual();

    for(let i = 1; i <= 10; i++){
        if(sexoAvatarEscolhido === 'masculino'){
          this.fotosAvatares.push(`homem_avatar${i}.png`);
        } else {          
          this.fotosAvatares.push(`mulher_avatar${i}.png`);
        }
    }
  }

  abrirModalHistoricoBatalha(){
    this.mostrarModalHistoricoBatalha = true;
  }

  redirecionarParaMeusStefamons(){
    const extras: NavigationExtras = { state: {fromHome: true}}
    this.router.navigate(['loja'], extras);
  }

  setAvatarAtual(index: number = this.indiceAvatarAtual){
    this.indiceAvatarAtual = index;
    if(this.criacaoUsuarioForm.value.sexoAvatar === 'feminino'){
      this.criacaoUsuarioForm.patchValue({'avatar': `mulher_avatar${index+1}.png`});
    }
    else{
      this.criacaoUsuarioForm.patchValue({'avatar': `homem_avatar${index+1}.png`});
    }
  }

}
