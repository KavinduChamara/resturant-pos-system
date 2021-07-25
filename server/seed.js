var seeder = require('mongoose-seed');
 
// Connect to db
seeder.connect('mongodb://localhost:27017/pos', function() {
 
  // Load models
  seeder.loadModels([
    'models/config-model.js',
    'models/category-model.js',
    'models/item-model.js'
  ]);
 
  // Clear collections
  seeder.clearModels(['config', 'category', 'item'], function() {
 
    // Populate DB
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data
var data = [
    {
        'model': 'config',
        'documents': [
            {
                'name': 'shopName',
                'config': "Simons's BBQ Team"
            },
            {
                'name': 'locationId',
                'config': 'SIMON123'
            }
        ]
    },
    {
        'model': 'category',
        'documents': [
            {
              '_id': '60f8191f14c7103523bf6d09',
              'name': 'Food'
            },
            {
              '_id' : "60f81c3d14c7103523bf6f95",
              'name': 'Alcohol'
            },
            {
              '_id': "60f81c4714c7103523bf6f9f",
              'name': 'Cold Drinks'
            },
            {
              '_id' : "60f81c5414c7103523bf6fa7",
              'name': 'Hot Drinks'
            }
          ]
    },
    {
      'model': 'item',
      'documents': [
          {
            "name" : "Grilled Cone",
            "image" : "grilledCone",
            "price" : 8.95,
            "amount" : "120g",
            "category" : "60f8191f14c7103523bf6d09"
          },
          {
            "name" : "Pancakes",
            "image" : "pancake",
            "price" : 6.35,
            "amount" : "80g",
            "category" : "60f8191f14c7103523bf6d09"
          },
          {
            "name" : "Ranch Burgers",
            "image" : "ranchBurger",
            "price" : 8.19,
            "amount" : "120g",
            "category" : "60f8191f14c7103523bf6d09"
          },
          {
            "name" : "Coca Cola",
            "image" : "cocacola",
            "amount" : "1 Bottle",
            "price" : 18.59,
            "category" : "60f81c4714c7103523bf6f9f"
          },
          {
            "name" : "Nescafe",
            "image" : "nescafe",
            "amount" : "1 Cup",
            "category" : "60f81c5414c7103523bf6fa7",
            "price" : 28.49,
          },
          {
            "name" : "Beer",
            "price" : 28.96,
            "image" : "beer",
            "amount" : "1 glass",
            "category" : "60f81c3d14c7103523bf6f95"
          }
      ]
    }
];