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

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  {
    path: 'books',
    canActivate: [AuthGuardService],
    component: BooksListComponent,
  },
  {
    path: 'books/new',
    canActivate: [AuthGuardService],
    component: BookFormComponent,
  },
  {
    path: 'books/view/:id',
    canActivate: [AuthGuardService],
    component: BookItemComponent,
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' },
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
