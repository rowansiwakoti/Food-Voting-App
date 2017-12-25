(function () {
    "use strict";
    var Dashboard = require("../dashboard/dashboard.page.js");
    var Login = require('../login/login.page');
    var Restaurant = require('../restaurant/restaurant.page');

    describe("dashboard", function () {
        var baseUrl = browser.baseUrl,
        dashboard = new Dashboard(),
        login = new Login(),
        restaurant = new Restaurant();

        describe('dashboard elements',function () {

            //Adding a dummy restaurant
            it('click add restaurant', function () {
                dashboard.addRestaurant.click();
                dashboard.restaurantName.sendKeys('Dummy Restaurant Name');
                dashboard.restaurantAddress.sendKeys('Dummy Restaurant Address');
                dashboard.restaurantContact.sendKeys('0124568798');
                // browser.sleep(1000);
                dashboard.okAddRestaurant.click();
                browser.sleep(1000);
            });

            //Editing the restaurant
            it('click edit',function () {
                dashboard.editButton.click();
                browser.sleep(1000);
                dashboard.cancelButton.click();
                browser.sleep(1000);

                dashboard.editButton.click();
                dashboard.restaurantName.clear();
                dashboard.restaurantAddress.clear();
                dashboard.restaurantContact.clear();
                dashboard.restaurantName.sendKeys('Dummy Restaurant Name edited');
                dashboard.restaurantAddress.sendKeys('Dummy Restaurant Address edited');
                dashboard.restaurantContact.sendKeys('0124568798');
                browser.sleep(1000);
                dashboard.okEditRestaurant.click();
                browser.sleep(1000);
            });

            //Selecting on the Restaurant
            it('select the restaurant', function(){
               dashboard.restaurantLink.click();
               browser.sleep(1000);
            });

            //Add a food to restaurant
            it('Add a food', function () {
                restaurant.addFood.click();
                restaurant.foodName.sendKeys('Dummy Food');
                restaurant.foodPrice.sendKeys('100');
                browser.sleep(1000);
                restaurant.okAddFood.click();
                browser.sleep(1000);
            })
            //Edit a food
            it('Edit a food',function () {
                restaurant.editFood.click();
                browser.sleep(1000);
                restaurant.foodName.clear();
                restaurant.foodPrice.clear();
                restaurant.foodName.sendKeys('Dummy Food edited');
                restaurant.foodPrice.sendKeys('100');
                browser.sleep(1000);
                restaurant.okEditFood.click();
                browser.sleep(1000);
            })
            //Delete a food
            it('Delete a food',function(){
                restaurant.deleteFood.click();
                browser.sleep(1000);
                restaurant.no.click();
                browser.sleep(1000);
                restaurant.deleteFood.click();
                browser.sleep(1000);
                restaurant.yes.click();
                browser.sleep(1000);
            })
            //Go back to dashboard
            it('Come to dashboard',function(){
                restaurant.backLink.click();
                browser.sleep(1000);
            });

            //Deleting the restaurant
            it('click delete',function () {
                dashboard.deleteButton.click();
                browser.sleep(1000);
                dashboard.no.click();
                browser.sleep(1000);
                dashboard.deleteButton.click();
                browser.sleep(1000);
                dashboard.yes.click();
                browser.sleep(1000);
            });


            //Log out
            it('log out',function () {
                dashboard.linkLogOut.click();
                browser.sleep(1000);
                dashboard.yes.click();
                browser.sleep(1000);
            });

            it('goto register page',function(){
                login.linkRegister.click();
                browser.sleep(1000);
            });
        });
    });


})();