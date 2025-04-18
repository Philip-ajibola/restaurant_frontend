// Importing images for restaurants and food items using require
const restaurant1 = require("../../assets/images/restaurant1.jpg");
const restaurant2 = require("../../assets/images/restaurant2.jpeg");
const restaurant3 = require("../../assets/images/restaurant3.jpg");
const restaurant4 = require("../../assets/images/restaurant4.jpg");
const restaurant5 = require("../../assets/images/restaurant5.jpg");

const food1 = require("../../assets/images/food1.jpg");
const food2 = require("../../assets/images/food2.jpg");
const food3 = require("../../assets/images/food3.jpg");
const food4 = require("../../assets/images/food4.jpg");

const Data = [
    {
        id: 1,
        img: restaurant1,
        name: "Glorious Restaurant",
        location: "TEXAS",
        description:
            "Glorious Restaurant is a 5-star restaurant where you can get the best meals at affordable prices.",
        foods: [
            {
                id: 1,
                img: food1,
                name: "Grilled Salmon",
                price: 20,
            },
            {
                id: 2,
                img: food2,
                name: "Spaghetti Carbonara",
                price: 15,
            },
            {
                id: 3,
                img: food3,
                name: "Beef Steak",
                price: 25,
            },
            {
                id: 4,
                img: food4,
                name: "Caesar Salad",
                price: 10,
            },
        ],
    },
    {
        id: 2,
        img: restaurant2,
        name: "Ocean Breeze Café",
        location: "CALIFORNIA",
        description:
            "Ocean Breeze Café offers a delightful fusion of seafood and coastal flavors in a cozy setting.",
        foods: [
            {
                id: 1,
                img: food1,
                name: "Lobster Bisque",
                price: 30,
            },
            {
                id: 2,
                img: food2,
                name: "Shrimp Tacos",
                price: 18,
            },
            {
                id: 3,
                img: food3,
                name: "Fish & Chips",
                price: 22,
            },
            {
                id: 4,
                img: food4,
                name: "Clam Chowder",
                price: 14,
            },
        ],
    },
    {
        id: 3,
        img: restaurant3,
        name: "Royal Feast House",
        location: "NEW YORK",
        description:
            "Royal Feast House is known for its luxurious dining experience and exquisite dishes.",
        foods: [
            {
                id: 1,
                img: food1,
                name: "Roasted Duck",
                price: 40,
            },
            {
                id: 2,
                img: food2,
                name: "Truffle Risotto",
                price: 35,
            },
            {
                id: 3,
                img: food3,
                name: "Lamb Chops",
                price: 45,
            },
            {
                id: 4,
                img: food4,
                name: "Chocolate Lava Cake",
                price: 12,
            },
        ],
    },
    {
        id: 4,
        img: restaurant4,
        name: "Green Garden Bistro",
        location: "FLORIDA",
        description:
            "Green Garden Bistro specializes in healthy, organic meals with fresh ingredients sourced locally.",
        foods: [
            {
                id: 1,
                img: food1,
                name: "Quinoa Salad",
                price: 14,
            },
            {
                id: 2,
                img: food2,
                name: "Vegan Burger",
                price: 16,
            },
            {
                id: 3,
                img: food3,
                name: "Avocado Toast",
                price: 12,
            },
            {
                id: 4,
                img: food4,
                name: "Smoothie Bowl",
                price: 10,
            },
        ],
    },
    {
        id: 5,
        img: restaurant5,
        name: "Spice Haven",
        location: "CHICAGO",
        description:
            "Spice Haven brings bold and spicy flavors from around the world to your plate.",
        foods: [
            {
                id: 1,
                img: food1,
                name: "Chicken Tikka Masala",
                price: 22,
            },
            {
                id: 2,
                img: food2,
                name: "Kimchi Fried Rice",
                price: 18,
            },
            {
                id: 3,
                img: food3,
                name: "Thai Curry",
                price: 20,
            },
            {
                id: 4,
                img: food4,
                name: "Szechuan Noodles",
                price: 16,
            },
        ],
    },
];

export default Data;