(function () {
    'use strict';
        var listF = [
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
    .controller('ToBuyList', ToBuyList)
    .controller('BoughtList', BoughtList)
    .factory('ShoppingListFactory', ShoppingListFactory);

    ToBuyList.$inject = ['ShoppingListFactory'];
    function ToBuyList(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory();
        list.items = listF;

        list.itemName = '';
        list.itemQuantity = '';


        list.buy = function (itemIndex) {
            console.log(list.items[itemIndex]);
            shoppingList.addItem(list.items[itemIndex].name, list.items[itemIndex].quantity);
            list.items.splice(itemIndex, 1);
        }

        list.empty = function () {
            return list.items.length == 0;
        }
    }

    BoughtList.$inject = ['ShoppingListFactory'];
    function BoughtList(ShoppingListFactory) {
        var listB = this;
        var shoppingList = ShoppingListFactory();

        listB.items = shoppingList.getItems(); 
        console.log(listB.items);

        listB.empty = function () {
            return listB.items.length == 0;
        }
    }


    function ShoppingListService() {
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
            console.log(items);
        }
    }

    function ShoppingListFactory() {
        var factory = function() {
            return new ShoppingListService()
        };
        return factory;
    }


})();