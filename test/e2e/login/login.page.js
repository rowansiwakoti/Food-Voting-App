(function () {
    "use strict";
    var LoginPageObject = function () {
        this.appName = element(by.css("h1"));
        this.pageName = element(by.css("h3"));

        this.usernameLabel = element(by.name("user_email"));
        this.passwordLabel = element(by.name("pass_word"))  ;
        this.userEmail = element(by.model("loginCtrl.user.email"));
        this.password = element(by.model("loginCtrl.user.userPassword"));

        this.loginButton = element(by.buttonText("Login"));

        this.linkRegister = element(by.tagName("a"));
    };
    module.exports = LoginPageObject;
})();