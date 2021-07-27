import { UserResponse } from '@shared/models/user.interface';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { products } from '@pages/home/products'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = products;

  isUser = null;
  isAdmin = null;
  isLogged = false;


  private destroy$ = new Subject<any>();

  constructor(public authSvc: AuthService) {}
  
  

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
        this.isUser = user?.role;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
