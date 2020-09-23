import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private loginSource$ = new BehaviorSubject<boolean>(false);
    login$ = this.loginSource$.asObservable();

    constructor() { }

    broadcastLogin(flag: boolean) {
        this.loginSource$.next(flag);
    }
}
