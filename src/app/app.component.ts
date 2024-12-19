import { Component } from '@angular/core';
import { HostelSubscriptionService } from './shared/services/hostel-subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PRP';

constructor(private hostelSubscriptionService: HostelSubscriptionService) {}

  ngOnInit(): void {
    // Start checking the subscription status every 60 seconds
    this.hostelSubscriptionService.startSubscriptionCheck();
  }
}