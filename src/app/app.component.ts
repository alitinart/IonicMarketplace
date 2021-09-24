import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    const loadedUser = JSON.parse(localStorage.getItem('userData'));

    if (loadedUser) {
      this.dataStorage.user.next(loadedUser);
    } else {
      return;
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
