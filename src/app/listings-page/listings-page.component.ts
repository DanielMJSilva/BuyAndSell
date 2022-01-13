import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    // when we get some data from getListings
    // the subscribe func will set the class variable listings
    // to the listings we get from getListings;
    this.listingsService.getListings().subscribe(listings => this.listings = listings)
  }

}
