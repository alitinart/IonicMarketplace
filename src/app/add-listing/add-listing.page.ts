import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../models/listing.model';
import { User } from '../models/user.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.page.html',
  styleUrls: ['./add-listing.page.scss'],
})
export class AddListingPage implements OnInit {
  currentImage: any;
  message: string;
  imagePath: any;
  url: string | ArrayBuffer;
  user: User;
  email: string;

  constructor(
    private dataStorage: DataStorageService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (this.user) {
      this.email = this.user.email;
    } else {
      this.email = form.value.email;
    }

    const newListing: Listing = {
      name: form.value.itemName,
      email: this.email,
      address: form.value.address,
      desc: form.value.itemDesc,
      price: form.value.itemPrice,
      category: form.value.itemCategory,
      image: this.url,
      phoneNumber: form.value.phoneNumber,
    };

    this.dataStorage.postListing(newListing).subscribe(
      (resData) => {
        this.dataStorage.newListing.next('New Listing');
        console.log(resData);
      },
      (error) => {
        alert(
          'There has been a error while sending the request. Please try again later.'
        );
        this.dataStorage.newListing.next('error');
      }
    );

    this.router.navigate(['/']);
  }

  onFileChanged(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }

  ngOnInit() {
    this.dataStorage.user.subscribe((user) => (this.user = user));
  }
}
