(function () {
    "use strict";

    var DashboardPageObject = function () {

        this.linkLogOut = element(by.partialLinkText('Logout'));
        this.yes = element(by.buttonText('Yes'));
        this.restaurants = element.all(by.repeater('restaurant in dashboardCtrl.restaurants')).first();
        this.restaurantLink = this.restaurants.element(by.tagName('a'));
        this.editButton = this.restaurants.element(by.css('button[ng-click="dashboardCtrl.editRestaurant(restaurant)"]'));
        this.deleteButton = this.restaurants.element(by.css('button[ng-click="dashboardCtrl.deleteRestaurant(restaurant)"]'));
        this.cancelButton = element(by.buttonText('Cancel'));
        this.no = element(by.buttonText('No'));
        this.addRestaurant = element(by.css('a[ng-click="dashboardCtrl.addRestaurant()"]'));
        this.restaurantName = element(by.model('restaurantModalCtrl.restaurant.name'));
        this.restaurantAddress = element(by.model('restaurantModalCtrl.restaurant.address'));
        this.restaurantContact = element(by.model('restaurantModalCtrl.restaurant.contact'));
        this.okAddRestaurant = element(by.buttonText('Add Restaurant'));
        this.okEditRestaurant = element(by.buttonText('Edit Restaurant'));
    };
    module.exports = DashboardPageObject;
})();