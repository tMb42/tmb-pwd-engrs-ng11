import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

}
