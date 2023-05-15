import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavItem } from 'app/base/sidenav/sidenav.model';
import { SidenavService } from 'app/base/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from 'app/base/sidenav/SIDENAV_ITEMS';
import { log } from 'console';
import { MenuItem } from 'primeng/api';
import { filter, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() public lang = 'en';
  public items: MenuItem[] = [];
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: 'Home', routerLink: '/' };

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url),
      tap(() => this.items = [this.homeItem])
    ).subscribe((url) => {
      this.buildBreadcrumb(url, this.items);
    });
  }

  private buildBreadcrumb(path: string, items: MenuItem[]): void {
    const item: SidenavItem = this.sidenavItems.find(item => '/' + item.link === path);
    console.log('here item::', this.sidenavItems, path)
    if (item) {
      const label = item.labels[this.lang];
      const routerLink = item.link;
      const children: MenuItem[] = [];
      // Ajouter chaque élément enfant
      if (item.children) {
        item.children.forEach(child => {
          children.push({
            label: child.labels[this.lang],
            routerLink: child.link
          });
        });
      }
      items.push({
        label: label,
        routerLink: routerLink,
        items: children,
        command: () => this.sidenavService.setCurrentEntityName('')
      });
    }
  }


}