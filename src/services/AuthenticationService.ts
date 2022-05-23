import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return 'superman' }
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}