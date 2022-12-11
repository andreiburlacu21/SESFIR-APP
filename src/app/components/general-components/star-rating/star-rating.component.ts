import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input('rating') rating: number = 2;
  @Input('readonly') readonly: boolean = true;
  starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr: number[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log("a " + this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    if(!this.readonly) {
      this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
        duration: this.snackBarDuration
      });
      rating++;
    }
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}