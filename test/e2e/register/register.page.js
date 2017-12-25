(
    function () {
        'use strict';

        var registerObject  = function () {
            this.linkBack = element(by.id('login-page'));
            this.heading = element(by.css('h3'));

            this.labelFirstName = element(by.name('first_name'));
            this.labelMiddleName = element(by.name('middle_name'));
            this.labelLastName = element(by.name('last_name'));
            this.labelEmail = element(by.name('email_id'));
            this.labelContact = element(by.name('contact_number'));
            this.labelAddress = element(by.name('address'));
            this.labelPassword = element(by.name('password'));
            this.labelConfirmPassword = element(by.name('confirm_password'));

            this.registerButton = element(by.buttonText('Register'));

            this.firstName = element(by.model('registerCtrl.user.firstName'));
            this.middleName = element(by.model('registerCtrl.user.middleName'));
            this.lastName = element(by.model('registerCtrl.user.lastName'));
            this.email = element(by.model('registerCtrl.user.email'));
            this.contact = element(by.model('registerCtrl.user.contactNo'));
            this.address = element(by.model('registerCtrl.user.address'));
            this.password = element(by.model('registerCtrl.user.userPassword'));
            this.confirmPassword = element(by.model('registerCtrl.user.confirmPassword'));

        };
        module.exports = registerObject;
    })();