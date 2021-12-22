import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BookFormComponent } from './components/book/book-form/book-form.component';
import { BookItemComponent } from './components/book/book-item/book-item.component';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four/four-oh-four.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome/welcome.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { BookService } from './services/book/book.service';

export enum AppRoutes {
  home = '',
  signin = 'auth/signin',
  signup = 'auth/signup',
  books = 'livres',
  newBook = 'nouveau-livre',
  fourOhFour = 'not-found',
}

const appRoutes: Routes = [
  {
    path: AppRoutes.home,
    component: WelcomeComponent,
  },
  {
    path: AppRoutes.signin,
    // canActivate: [AuthGuardService],
    component: SigninComponent,
  },
  {
    path: AppRoutes.signup,
    // canActivate: [AuthGuardService],
    component: SignupComponent,
  },
  {
    path: `${AppRoutes.books}`,
    // canActivate: [AuthGuardService],
    component: BooksListComponent,
  },
  {
    path: `${AppRoutes.books}/:id`,
    // canActivate: [AuthGuardService],
    component: BookItemComponent,
  },
  {
    path: `${AppRoutes.newBook}`,
    // canActivate: [AuthGuardService],
    component: BookFormComponent,
  },
  { path: AppRoutes.fourOhFour, component: FourOhFourComponent },
  { path: '**', redirectTo: AppRoutes.fourOhFour },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BooksListComponent,
    BookItemComponent,
    BookFormComponent,
    HeaderComponent,
    FourOhFourComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, AuthGuardService, BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
