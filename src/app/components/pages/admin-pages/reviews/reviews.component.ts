import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Reveiw } from 'src/app/models/review.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  isLoading: boolean = false;
  reviews: Location[] = [];

  constructor(private readonly reviewsService: ReviewService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllReviews();
  }

  private getAllReviews() {
    this.isLoading = true;
    
  }

  addReview() {
    let dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: {
        action: Action
      }
    })
  }

  editReview(review: Reveiw) {

  }

  deleteReview(review: Reveiw) {

  }

}
