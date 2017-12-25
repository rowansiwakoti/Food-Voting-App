(function () {
    "use strict";
    var Login = require("../login/login.page.js");
    var Register = require('../register/register.page');

    describe("login", function () {
        var baseUrl = browser.baseUrl;
        var login = new Login();
        var register = new Register();

        browser.get("#!/login");

        describe("Login page elements", function () {

            it("should load the login page and  check the app name", function () {
                browser.getCurrentUrl().then(function (url) {
                    expect(url).toBe(baseUrl + "#!/login");
                });
                expect(login.appName.getText()).toBe("Food Ordering App");
            });

            it("should test the page name", function () {
                expect(login.pageName.getText()).toBe("User Login");
            });

            describe('Login as an admin',function () {
                it("should check on labels and input fields", function () {
                    expect(login.usernameLabel.getText()).toBe("User Email");
                    login.userEmail.sendKeys("rowansiwakoti@gmail.com");
                    browser.sleep(1000);
                    expect(login.passwordLabel.getText()).toBe("Password");
                    login.password.sendKeys("f1soft");
                    browser.sleep(1000);
                    login.loginButton.click();
                    browser.sleep(1000);
                });
            });

        });
    });
})();