import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

	user$: Observable<User>;

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private loginService: LoginService,
		private ngZone: NgZone) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					return of(null);
				}
			})
		);
	}

	getErrorMessage(error: Error) {
		console.log('SigUp Error: ', error.message);
	}

	async googleSignIn() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const credential = await this.afAuth.signInWithPopup(provider);
		console.log('Credential: ', credential);
		return this.updateUserData(credential.user);
	}

	async emailSignUp(email: string, password: string) {
		return this.afAuth.createUserWithEmailAndPassword(email, password)
			.then(credential => {
				// this.sendVerificationSignUp();
				this.updateUserData(credential.user);
			});
		// .catch(error => this.getErrorMessage(error));
	}

	async emailSignIn(email: string, password: string) {
		return await this.afAuth.signInWithEmailAndPassword(email, password)
			.then(credential => {
				this.ngZone.run(() => {
					console.log('_User: ', credential);
					this.updateUserData(credential.user);
				});
			});
		// .catch(error => this.getErrorMessage(error));
	}

	async signOut() {
		await this.afAuth.signOut();
		this.loginService.broadcastLogin(false);
	}

	private updateUserData({ uid, displayName, email }: User) {
		// ---sets member data on firestore on login  ---
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
		const data = {
			uid,
			displayName,
			email
		};
		console.log('UpdateUserData: ', data);
		// this.loginService.broadcastLogin(true);
		return userRef.set(data, { merge: true });
	}
}
