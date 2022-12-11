import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Review } from 'src/app/models/review.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { Action } from 'src/app/utils/interceptor/admin-actions';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})

export class ReviewDialogComponent implements OnInit {
  action: Action = Action.ADD;
  review: Review = new Review();
  accountIdFormControl = new FormControl('', [Validators.required]);
  locationIdFormControl = new FormControl('', [Validators.required]);
  gradeFormControl = new FormControl(0, [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl(new Date(), [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly notificationService: NotificationService,
    public dialogRef: MatDialogRef<ReviewDialogComponent>) { }

  ngOnInit(): void {
    this.getPassedData();
  }

  private getPassedData() {
    this.action = this.data.action;
    if (this.action !== Action.ADD) {
      this.review = this.data.review;
    }

    if (this.action === Action.UPDATE) {
      this.accountIdFormControl.setValue(this.review.accountId!!);
      this.locationIdFormControl.setValue(this.review.locationId!!);
      this.gradeFormControl.setValue(this.review.grade!!);
      this.descriptionFormControl.setValue(this.review.description!!);
      this.dateFormControl.setValue(new Date(this.review.date!!));
    }
  }

  addReview() {
    let newReview: Review = new Review();
    newReview.accountId = this.accountIdFormControl.getRawValue() ?? "";
    newReview.locationId = this.locationIdFormControl.getRawValue() ?? "";
    newReview.grade = this.gradeFormControl.getRawValue() ?? 0;
    newReview.description = this.descriptionFormControl.getRawValue() ?? "";
    newReview.date = this.descriptionFormControl.getRawValue as unknown as string ?? "";

    this.dialogRef.close({ event: 'Add', data: newReview });
  }

  updateReview() {
    let newReview: Review = new Review();
    newReview.reviewId = this.review.reviewId;
    newReview.accountId = this.accountIdFormControl.getRawValue() ?? "";
    newReview.locationId = this.locationIdFormControl.getRawValue() ?? "";
    newReview.grade = this.gradeFormControl.getRawValue() ?? 0;
    newReview.description = this.descriptionFormControl.getRawValue() ?? "";
    newReview.date = this.descriptionFormControl.getRawValue as unknown as string ?? "";

    this.dialogRef.close({ event: 'Update', data: newReview });
  }

  deleteReview() {
    this.dialogRef.close({ event: 'Delete', data: this.review.reviewId })
  }
}
