import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async createNewUser(email: string, password: string) {
    try {
      console.log('in create new user function', email, password);

      const authResult = await createUserWithEmailAndPassword(
        getAuth(getApp()),
        email,
        password
      );
      console.log("Création d'un nouvel utilisateur réussie : ", authResult);
      return authResult;
    } catch (error) {
      console.error(
        'Une erreur est survenue lors de la création du nouvel utilisateur !',
        error
      );
      return error;
    }
  }

  async signInUser(email: string, password: string) {
    try {
      const authResult = await signInWithEmailAndPassword(
        getAuth(getApp()),
        email,
        password
      );
      console.log("Identification de l'utilisateur réussie : ", authResult);
      return authResult;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'identification de l'utilisateur !",
        error
      );
      return error;
    }
  }

  async signOutUser() {
    try {
      const signOutResult = await signOut(getAuth(getApp()));
      console.log("Déconnexion de l'utilisateur réussie...", signOutResult);
      return signOutResult;
    } catch (error) {
      console.error("La déconnexion de l'utilisateur a échoué !", error);
      return error;
    }
  }
}
