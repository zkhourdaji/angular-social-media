import { AuthService } from '../../../src/app/services/auth-service/auth.service';
import { element, by, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('Authentication', () => {

  // let authService: AuthService;

  beforeEach(() => {
    // authService = new AuthService();
  });

  it('User should be able to login', () => {
    browser.get('/').then(() => {
      //TODO: this might break in the future.
      // auth service automitally logs 'Zafer' in the first time
      // for testing purposes.
      const logout = element(by.buttonText('Logout'));
      if (logout) {
        logout.click();
      }

      const signin = element(by.buttonText('Sign in'));
      signin.click();
      // browser.waitForAngularEnabled(true);
      const usernameField = element(by.id('username'));
      const passwordField = element(by.id('password'));
      const submit = element(by.className('form__submit'));

      usernameField.sendKeys('Zafer');
      passwordField.sendKeys('Password');
      submit.click();

      const welcome = element(by.linkText('Hello Zafer'));
      expect(welcome.isPresent()).toBe(true);

    });


  });

});
