import { browser, by, element, ExpectedConditions } from 'protractor';

import { BellowsLoginPage } from '../../../pages/loginPage';
import { ProjectsPage } from '../../../pages/projectsPage';
import { SignupPage } from '../../../pages/signupPage';

describe('E2E testing: Signup app', () => {
  const constants = require('../../../../testConstants');
  const page = new SignupPage();
  const loginPage = new BellowsLoginPage();
  const projectsPage = new ProjectsPage();

  it('setup and contains a user form', () => {
    loginPage.logout();
    page.get();
    expect(page.signupForm).toBeDefined();
  });

  it('can verify required information filled', () => {
    page.get();
    expect<any>(page.signupButton.isEnabled()).toBe(false);
    page.emailInput.sendKeys(constants.unusedEmail);
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setInvalidCaptcha();
    expect<any>(page.signupButton.isEnabled()).toBe(true);
  });

  it('cannot submit if email is invalid', () => {
    page.emailInput.clear();
    page.emailInput.sendKeys(constants.emailNoAt);
    page.captcha.setInvalidCaptcha();
    expect<any>(page.emailInvalid.isDisplayed()).toBe(true);
    expect<any>(page.signupButton.isEnabled()).toBe(false);
  });

  it('cannot submit if password is weak', () => {
    page.emailInput.clear();
    page.emailInput.sendKeys(constants.unusedEmail);
    expect<any>(page.signupButton.isEnabled()).toBe(true);
    page.passwordInput.clear();
    page.passwordInput.sendKeys(constants.passwordTooShort);
    page.captcha.setInvalidCaptcha();
    expect<any>(page.passwordIsWeak.isDisplayed()).toBe(true);
    expect<any>(page.signupButton.isEnabled()).toBe(false);
  });

  it('can submit if password not weak', () => {
    page.passwordInput.clear();
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setInvalidCaptcha();
    expect<any>(page.passwordIsWeak.isDisplayed()).toBe(false);
    expect<any>(page.signupButton.isEnabled()).toBe(true);
  });

  it('can submit if password is showing and not weak', () => {
    page.showPassword.click();
    page.captcha.setInvalidCaptcha();
    expect<any>(page.passwordIsWeak.isDisplayed()).toBe(false);
    expect<any>(page.signupButton.isEnabled()).toBe(true);
  });

  it('cannot submit if captcha not selected', () => {
    page.get();
    page.emailInput.sendKeys(constants.unusedEmail);
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    expect<any>(page.signupButton.isEnabled()).toBe(false);
  });

  it('can submit a user registration request and captcha is invalid', () => {
    page.get();
    page.emailInput.sendKeys(constants.unusedEmail);
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setInvalidCaptcha();
    page.signupButton.click();
    expect<any>(page.captchaInvalid.isDisplayed()).toBe(true);
  });

  it('finds the admin user (case insensitive) already exists', () => {
    page.get();
    page.emailInput.sendKeys(constants.adminEmail.toUpperCase());
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setValidCaptcha();
    expect<any>(page.signupButton.isEnabled()).toBe(true);
    page.signupButton.click();
    expect<any>(page.emailTaken.isDisplayed()).toBe(true);
  });

  it('can prefill email address that can\'t be changed', () => {
    page.getPrefilledEmail(constants.unusedEmail);
    expect<any>(page.emailInput.isEnabled()).toBe(false);
  });

  it('can prefill email address that already exists', () => {
    page.getPrefilledEmail(constants.adminEmail);
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setValidCaptcha();
    page.signupButton.click();
    expect<any>(page.emailTaken.isDisplayed()).toBe(true);
  });

  it('can signup a new user', () => {
    page.get();
    page.emailInput.sendKeys(constants.unusedEmail);
    page.nameInput.sendKeys(constants.unusedName);
    page.passwordInput.sendKeys(constants.passwordValid);
    page.captcha.setValidCaptcha();
    expect<any>(page.signupButton.isEnabled()).toBe(true);
    page.signupButton.click();

    // added to stop intermittent error
    // "Failed: javascript error: document unloaded while waiting for result"
    browser.wait(ExpectedConditions.urlContains('projects'), constants.conditionTimeout);

    // Verify new user logged in and redirected to projects page
    browser.getCurrentUrl().then(() => {
      expect(browser.getCurrentUrl()).toContain('/app/projects');
    });
  });

  it('redirects to projects page if already logged in', () => {
    loginPage.logout();
    loginPage.loginAsUser();
    page.get();
    browser.wait(ExpectedConditions.urlContains('projects'), constants.conditionTimeout);
    browser.getCurrentUrl().then(() => {
      expect(browser.getCurrentUrl()).toContain('/app/projects');
    });
  });
});
