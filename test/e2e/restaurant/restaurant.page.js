(
    function () {
        'use strict';

        var restaurantObject = function(){
          this.backLink = element(by.partialLinkText('Go Back'));
          this.cancel = element(by.buttonText('Cancel'));
          this.no = element(by.buttonText('No'));
          this.yes = element(by.buttonText('Yes'));
          this.okEditFood = element(by.buttonText('Edit Food'));
          this.addFood = element(by.partialLinkText('Add Food'));
          this.okAddFood = element(by.css('button[ng-click="foodCtrl.addFood(foodCtrl.food)"]'));
          this.foodName = element(by.model('foodCtrl.food.name'));
          this.foodPrice = element(by.model('foodCtrl.food.price'));
          this.food = element.all(by.repeater('food in restaurantCtrl.foods')).first();
          this.editFood = this.food.element(by.partialLinkText('Edit'));
          this.deleteFood = this.food.element(by.partialLinkText('Delete'));
        };

        module.exports = restaurantObject;
    }
)();