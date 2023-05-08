import { Account } from "./account.model";
import { Location } from "./location.model";
import { Review } from "./review.model";

export class ReviewEntity extends Review {
    account?: Account;
    location?: Location;
}