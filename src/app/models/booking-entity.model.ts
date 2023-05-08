import { Account } from "./account.model";
import { Booking } from "./booking.model";
import { Location } from "./location.model";

export class BookingEntity extends Booking {
    account?: Account;
    location?: Location;
}