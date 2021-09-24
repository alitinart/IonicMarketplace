import { Component, OnInit } from '@angular/core';
import { Listing } from '../models/listing.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listings: Listing[];
  isLoading = true;

  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.dataStorage.fetchListings().subscribe(
      (listings: Listing[]) => {
        this.listings = listings;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        alert('You have no internet connection !');
      }
    );
    this.dataStorage.newListing.subscribe((status) => {
      if (status === 'Error') {
        return;
      } else {
        this.dataStorage.fetchListings().subscribe(
          (listings: Listing[]) => {
            this.listings = listings;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
            alert('You have no internet connection !');
          }
        );
      }
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      window.location.reload();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onRefresh() {
    window.location.reload();
  }

  onBuy() {}
}
