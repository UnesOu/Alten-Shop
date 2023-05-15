import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'Admin Products',
    labels: {
      en: "Admin Products",
      fr: "Produits Administrateur"
    },
    link: 'admin/products'

  },
  {
    id: 'Products',
    labels: {
      en: "Products",
      fr: "Produits"
    },
    link: 'products'

  }

];