import { Observable } from "rxjs";

export interface MenuItemInterface {
  title: Observable<string>;
  url?: string;
  icon?: string;
  avatar?: Observable<string>;
}
