import { AuthService } from '../auth-service/auth.service';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('Auth Guard', () => {

  let authService: AuthService;
  let authGuard: AuthGuard;
  let mockRouter: Router;

  beforeEach(() => {
    authService = new AuthService();
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
    authGuard = new AuthGuard(authService, mockRouter);
  });

  it('should return false if use is not authenticated', () => {
    const spy = spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const canActivateResult = authGuard.canActivate();
    expect(canActivateResult).not.toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['signin']);
  });

  it('should return true if the user is authenticated', () => {
    const spy = spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const canActivateResult = authGuard.canActivate();
    expect(canActivateResult).toBe(true);
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
});
