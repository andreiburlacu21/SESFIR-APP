import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Location } from 'src/app/models/location.model';
import { Review } from 'src/app/models/review.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { environment } from 'src/environments/environment';
import { WriteAReviewComponent } from './write-a-review/write-a-review.component';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {
  isLoading: boolean = true;
  loggedInAccount: Account = new Account();
  location: Location;
  images: string[] = [];
  reviews: Review[] = [];  
  imageObject: Object[] = [];

  constructor(private router: Router,
    private imageService: ImageService,
    private reviewService: ReviewService,
    private _bottomSheet: MatBottomSheet,
    private accountService: AccountService) { 
    this.location = this.router.getCurrentNavigation()!.extras.state!;
  }

  ngOnInit(): void {
    if(this.location) {
      this.getLocationData();
    }

    this.accountService.getMyData().subscribe({
      next: resp => {
        this.loggedInAccount = resp;
      },
      error: () => {
      
      }
    });
  }

  private getLocationData() {
    this.isLoading = true;
    this.imageService.getImages("location", this.location.locationId!).subscribe({
      next: images => {
        this.images = images;
        this.images.forEach(imgSource => {
          this.imageObject.push({
            image: imgSource,
            thumbImage: imgSource
          });
        });

        this.reviewService.getAllReviews().subscribe({
          next: reviews => {
            this.reviews = reviews.filter(review => review.locationId === this.location.locationId);
            this.isLoading = false;
            // this.reviews.forEach(review => {
            //   this.reviewService.getReviewEntityById(this.location.locationId!).subscribe({
            //     next: resp => {
            //       review.reviewEntity = resp;
            //       this.isLoading = false;
            //     },
            //     error: () => {

            //     }
            //   });
            // });
          },
          error: () => {
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  zoomImage() {
    environment.hideSidenav = true;
  }

  exitImage() {
    environment.hideSidenav = false;
  }

  calculateLocationRating(locationId: number): number {
    let reviewsForThisLocation: Review[] = [];
    let totalScore: number = 0;

    this.reviews.forEach(review => {
      if (review.locationId === locationId) {
        totalScore += review.grade!!;
        reviewsForThisLocation.push(review);
      }
    });

    if(reviewsForThisLocation.length === 0 ) {
      return 0;
    }

    let rating: number = totalScore / reviewsForThisLocation.length;

    if(rating % 1 < 0.5) {
      return Math.floor(rating);
    } 

    if(rating % 1 >= 0.5 ) {
      return Math.ceil(rating);
    }

    return 0;
  }

  writeReview() {
    const config: MatBottomSheetConfig = {data: {location: this.location, account: this.loggedInAccount }};

    this._bottomSheet.open(WriteAReviewComponent, config);
  }
}
