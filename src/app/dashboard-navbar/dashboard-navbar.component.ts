import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../springboot-api-services/auth.service';

interface NavLink {
  label: string;
  icon: string;
  route: string;
  idx: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements AfterViewInit {


  @ViewChild('nbLinks') nbLinksRef!: ElementRef;
  @ViewChild('nbPill') nbPillRef!: ElementRef;

  activeIdx = 0;

  navLinks: NavLink[] = [
    { label: 'Home',         icon: 'ti-home',        route: '/home',         idx: 0 },
    { label: 'Appointments', icon: 'ti-calendar',    route: '/appointments', idx: 1 },
    { label: 'Doctors',      icon: 'ti-stethoscope', route: '/doctors',      idx: 2 },
    { label: 'Reports',      icon: 'ti-chart-bar',   route: '/reports',      idx: 3 },
    { label: 'Settings',     icon: 'ti-settings',    route: '/settings',     idx: 4 },
  ];
  username:string='';

  constructor(private router: Router,private service:AuthService) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.movePill(this.activeIdx), 300);
    window.addEventListener('resize', () => this.movePill(this.activeIdx));
  }

  setActive(idx: number): void {
    this.activeIdx = idx;
    this.movePill(idx);
    this.router.navigate([this.navLinks[idx].route]);
  }

  movePill(idx: number): void {
    const container = this.nbLinksRef?.nativeElement;
    const linkEls = container?.querySelectorAll('.nb-link');
    const pill = this.nbPillRef?.nativeElement;
    if (!container || !linkEls || !pill) return;

    const el = linkEls[idx];
    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    pill.style.left  = (er.left - cr.left) + 'px';
    pill.style.width = er.width + 'px';
  }
  logout() {
    this.service.logout();
    this.router.navigate(['login/register']);
}


  get activeLabel(): string {
    return this.navLinks[this.activeIdx]?.label ?? '';
  }
  getUserName(){
    return this.service.getProfile().subscribe(res=>{
      this.username=res;
      console.log(this.username);

    })
  }
}