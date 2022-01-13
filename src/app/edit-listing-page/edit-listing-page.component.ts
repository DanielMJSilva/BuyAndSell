import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css'],
})

export class EditListingPageComponent implements OnInit {
  listing!: Listing;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private listingsService: ListingsService
    ) {

    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.listingsService.getListingById(id)
    .subscribe(listing => this.listing = listing)
  };

  onSubmit({name, description, price}: {[key: string]: any}): void {
    this.listingsService.editListing(this.listing.id, name, description, price)
    .subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  };
};
