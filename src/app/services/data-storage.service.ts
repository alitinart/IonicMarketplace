/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Listing } from '../models/listing.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  public user = new BehaviorSubject<User>(null);
  public newListing = new BehaviorSubject<string>(null);

  fetchListings() {
    return this.http
      .get<Listing>(
        'https://ebayripoff-423ae-default-rtdb.firebaseio.com/listings.json'
      )
      .pipe(
        map((resData) => {
          const listingArray = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              listingArray.push({ ...resData[key], id: key });
            }
          }
          return listingArray;
        })
      );
  }

  postListing(listing: Listing) {
    return this.http.post<Listing>(
      'https://ebayripoff-423ae-default-rtdb.firebaseio.com/listings.json',
      listing
    );
  }

  postOrder(fullName: string, address: string, phoneNumber: string) {
    return this.http.post(
      'https://ebayripoff-423ae-default-rtdb.firebaseio.com/orders.json',
      {
        fullName,
        address,
        phoneNumber,
      }
    );
  }
}
