import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  loginForm = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Stefamon', disabled: true},
      {label: 'Home', icon:'pi pi-home', routerLink:'/home'},
      {label: 'Loja', icon: 'pi pi-shopping-cart', routerLink: '/loja'}
    ];
  }

  login(){
    
  }

}
