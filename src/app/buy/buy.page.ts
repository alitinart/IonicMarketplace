/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Listing } from '../models/listing.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  selectedListing: Listing = {
    name: 'Dummy Data',
    email: 'dummy@gmail.com',
    desc: 'DummyData',
    image: 'D',
    address: 'D',
    price: 12,
    category: 'gaming',
    phoneNumber: 123123,
  };
  id: number;

  constructor(
    private dataStorage: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.dataStorage.fetchListings().subscribe((listings: Listing[]) => {
      this.selectedListing = listings.find(
        (listing, index) => index === this.id
      );
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onSubmit(form: NgForm) {
    this.dataStorage
      .postOrder(
        form.value.fullName,
        form.value.address,
        form.value.phoneNumber
      )
      .subscribe((resData) => {
        console.log(resData);
      });
    this.router.navigate(['tabs/home']);
  }
}
