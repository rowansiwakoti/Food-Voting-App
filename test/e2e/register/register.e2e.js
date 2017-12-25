(
    function () {
        'use strict';

        var Register = require('../register/register.page.js');
        var Login = require('../login/login.page');
        var Dashboard = require('../dashboard/dashboard.page')


        describe('register' , function () {
            var baseUrl = browser.baseUrl,
            register = new Register(),
            login = new Login(),
            dashboard = new Dashboard();

            describe('register page elements' , function () {

                //Check First Name
                it('check First Name',function () {
                    expect(register.labelFirstName.getText()).toBe('First Name');
                    register.firstName.sendKeys('DummyFirstName');
                });
                //Check Middle Name
                it('check Middle Name',function () {
                    expect(register.labelMiddleName.getText()).toBe('Middle Name');
                    register.middleName.sendKeys('DummyMiddleName');
                });
                //Check Last Name
                it('check Last Name',function () {
                    expect(register.labelLastName.getText()).toBe('Last Name');
                    register.lastName.sendKeys('DummyLastName');
                });
                //Check Email Id
                it('check email id',function () {
                    expect(register.labelEmail.getText()).toBe('Email ID');
                    register.email.sendKeys('DummyEmail@dummy.com');
                });
                //Check Contact
                it('check contact',function () {
                    expect(register.labelContact.getText()).toBe('Contact No.');
                    register.contact.sendKeys('123456789');
                });
                //Check Address
                it('check address',function () {
                    expect(register.labelAddress.getText()).toBe('Address');
                    register.address.sendKeys('DummyAddress');
                });
                //Check Password
                it('check password',function () {
                    expect(register.labelPassword.getText()).toBe('Password');
                    register.password.sendKeys('DummyPassword');
                });
                //Check Confirm Password
                it('check Confirm Password',function () {
                    expect(register.labelConfirmPassword.getText()).toBe('Confirm Password');
                    register.confirmPassword.sendKeys('DummyPassword');
                    browser.sleep(1000);
                });
                //Register the dummy User
                it('register the dummy user',function(){
                   expect(register.registerButton.click());
                   browser.sleep(1000);
                });
                //Login as a User
                describe('User',function () {

                    it('Login as user', function(){
                        login.userEmail.clear();
                        login.password.clear();
                        login.userEmail.sendKeys('DummyEmail@dummy.com');
                        login.password.sendKeys('DummyPassword');
                        login.loginButton.click();
                        browser.sleep(1000);
                    });
                    //Select a restaurant
                    it('select a restaurant', function () {
                        dashboard.restaurantLink.click();
                        browser.sleep(1000);
                    });

                });

            });
        });
    }
)();