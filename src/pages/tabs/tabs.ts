import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TrendingPage } from '../trending/trending';
import { SubscriptionsPage } from '../subscriptions/subscriptions';
import { InboxPage } from '../inbox/inbox';
import { LibraryPage } from '../library/library';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TrendingPage;
  tab3Root = SubscriptionsPage;
  tab4Root = InboxPage;
  tab5Root = LibraryPage;

  constructor() {

  }
}
