import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core-components/nav-bar/nav-bar.component';
import { FooterComponent } from './core-components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
