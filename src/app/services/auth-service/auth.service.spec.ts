import { AuthService } from './auth.service';

describe('Auth Service', () => {

  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('isAuthenticated should return true if user signed in', () => {
    authService.signin({ username: 'Zafer', password: 'Zafer' });
    const isAuthenticatedResult = authService.isAuthenticated();
    expect(isAuthenticatedResult).toBe(true);
  });

  it('isAuthenticated should return false if no user is signed in', () => {
    const isAuthenticatedResult = authService.isAuthenticated();
    expect(isAuthenticatedResult).toBe(false);
  });

  it('getCurrentUserName should return the current signed in username or empty string if no user is signed in', () => {
    const firstAttempt = authService.getCurrentUserName();
    expect(firstAttempt).toBeNull();

    authService.signin({ username: 'Zafer', password: 'Password' });
    const secondAttempt = authService.getCurrentUserName();
    expect(secondAttempt).toBe('Zafer');
  });

  it('logout should set the current username to null', () => {
    authService.signin({ username: 'Zafer', password: 'Password' });
    authService.logout();
    const username = authService.getCurrentUserName();
    expect(username).toBeNull();
  });

  it('get username observable should emit current username upon signin and null upon signout', () => {
    let username: string;
    const subscription = authService.username.subscribe(emittedUsername => username = emittedUsername);
    expect(username).toBeNull();
    authService.signin({ username: 'Zafer', password: 'Password' });
    expect(username).toBe('Zafer');
    authService.logout();
    expect(username).toBeNull();
    subscription.unsubscribe();
  });
});
