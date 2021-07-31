import { UserResponse } from '@shared/models/user.interface';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { products } from '@pages/home/products';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  title = 'mte-test';
  displayedColumns = ['position', 'name', 'surname', 'birth'];
  
  dataSource: MatTableDataSource<Element>;

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
      this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
      
    }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

export interface Element {
  name: string;
  position: number;
  surname: string;
  birth: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Albert', surname: 'Einstein', birth: '1879'},
  {position: 2, name: 'Marie', surname: 'Curie', birth: '1867'},
  {position: 3, name: 'Enrico', surname: 'Fermi', birth: '1901'},
  {position: 4, name: 'Dmitri', surname: 'Mendeleev', birth: '1834'},
  {position: 5, name: 'Alfred', surname: 'Nobel', birth: '1833'},
  {position: 6, name: 'Ernest', surname: 'Lawrence', birth: '1901'},
  {position: 7, name: 'Glenn', surname: 'Seaborg', birth: '1912'},
  {position: 8, name: 'Niels', surname: 'Bohr', birth: '1885'},
  {position: 9, name: 'Lise', surname: 'Meitner', birth: '1878'},
  {position: 10, name: 'Wilhelm', surname: 'Röntgen', birth: '1845'},
  {position: 11, name: 'Nicolaus', surname: 'Copernicus', birth: '1473'},
  {position: 12, name: 'Georgy', surname: 'Flyorov', birth: '1913'},
  {position: 13, name: 'Yuri', surname: 'Oganessian', birth: '1933'},
  {position: 14, name: 'Johan', surname: 'Gadolin', birth: '1760'},
  {position: 15, name: 'Pierre', surname: 'Curie', birth: '1859'},
];

