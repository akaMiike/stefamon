import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioEstaLogado: boolean;
  usuarioLogado: string;
  items: MenuItem[];

  loginForm = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioEstaLogado = this.authService.isLogado();
    this.usuarioLogado = this.authService.getUsuarioLogado();

    this.items = [
      {label: 'Stefamon', disabled: true},
      {label: 'Home', icon:'pi pi-home', routerLink:'/home'},
      {label: 'Loja', icon: 'pi pi-shopping-cart', routerLink: '/loja'},
      {label: 'Batalhar', icon: 'pi pi-users', routerLink:'/home'}
    ];

  }

  login(){
    this.authService.login(
      this.loginForm.value.usuario!!,
      this.loginForm.value.senha!!
    ).subscribe(() => {
      this.usuarioEstaLogado = this.authService.isLogado();
      this.usuarioLogado = this.authService.getUsuarioLogado()
    });
  }

  logout(){
    this.usuarioEstaLogado = false;
    this.loginForm.reset();
    this.authService.logout();
  }

}
