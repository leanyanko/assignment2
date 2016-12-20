(function () {
    'use strict';
        var list = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = list;

        toBuy.itemName = '';
        toBuy.itemQuantity = '';


        toBuy.buy = function (itemIndex) {
            ShoppingListCheckOffService.addItem(toBuy.items[itemIndex].name, toBuy.items[itemIndex].quantity);
            toBuy.items.splice(itemIndex, 1);
        }

        toBuy.empty = function () {
            return toBuy.items.length == 0;
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var Bought = this;

        Bought.items = ShoppingListCheckOffService.getItems(); 

        Bought.empty = function () {
            return Bought.items.length == 0;
        }
    }


    function ShoppingListCheckOffService() {
        var service = this;
        var items = [];

        service.getItems = function () {
            return items;
        };

        service.addItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            items.push(item);
        }
    }
})();