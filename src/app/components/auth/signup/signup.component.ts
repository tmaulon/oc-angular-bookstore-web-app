import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.module';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
    ],
  });
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('in on ngOnInit ...');
    this.initForm();
  }

  initForm() {
    console.log('in on init ...');
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  async onSubmit() {
    console.log('in on submit ...');
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    console.log('email, password : ', email, password);

    try {
      const newUser = await this.authService.createNewUser(email, password);
      if (newUser) {
        this.router.navigate([`/${AppRoutes.books}`]);
      }
    } catch (error) {
      this.errorMessage = error as string;
    }
  }
}
