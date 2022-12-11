import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { Review } from 'src/app/models/review.model';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {
  isLoading: boolean = false;
  location: Location = new Location()
  images: string[] = [];
  reviews: Review[] = [];  
  imageObject: Object[] = [];

  constructor(private router: Router,
    private imageService: ImageService,
    private reviewService: ReviewService) { 
    this.location = this.router.getCurrentNavigation()!.extras.state!;
  }

  ngOnInit(): void {
    if(this.location) {
      this.getLocationData();
    }
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
            this.reviews.forEach(review => {
              this.reviewService.getReviewEntityById(this.location.locationId!).subscribe({
                next: resp => {
                  review.reviewEntity = resp;
                  this.isLoading = false;
                },
                error: () => {

                }
              });
            });
          },
          error: () => {

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
}
