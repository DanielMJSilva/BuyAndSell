import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  isLoading: boolean = true;
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}

  ngOnInit(): void {
    // gets the is from url (ActivatedRoute)
    const id = this.route.snapshot.paramMap.get('id') as string;
    // finds the corresponding listing from db
    this.listingService.getListingById(id).subscribe((listing) => {
      this.listing = listing;
      this.isLoading = false;
    });

    // adds a view to listing
    this.listingService
      .addViewToListing(id)
      .subscribe(() => console.log(`Views updated`));
  }
}
