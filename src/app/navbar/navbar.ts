import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}
}
