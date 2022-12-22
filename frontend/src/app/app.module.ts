import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './rounded-btn/rounded-btn.component';
import { NavbarSearchbarComponent } from './navbar-searchbar/navbar-searchbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DummyHeaderComponent } from './dummy-header/dummy-header.component';
import { DummyMainComponent } from './dummy-main/dummy-main.component';
import { CardListComponent } from './card-list/card-list.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { RegisterComponent } from './register/register.component';
import { QuillModule } from 'ngx-quill';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    NavbarSearchbarComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DummyHeaderComponent,
    DummyMainComponent,
    CardListComponent,
    MainNavigationComponent,
    RegisterComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [ ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
