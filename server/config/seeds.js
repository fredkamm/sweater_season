const db = require('./connection');
const { User, Sweater, Tag } = require('../models');

db.once('open', async () => {
  await Tag.deleteMany();

  const tags = await Tag.insertMany([
    { name: 'Holloween' },
    { name: 'Thanksgiving' },
    { name: 'Christmas' },
    { name: 'Hanukkah'},
    { name: 'Fall' },
    { name: 'Winter' },
    { name: 'Cardigan' },
    { name: 'Pullover' },
    { name: 'Crewneck' },
    { name: 'V-Neck' },
    { name: 'Turtleneck' },
    { name: 'Sweater Vest' },
    { name: 'Animal'}
  ]);

  console.log('Tags seeded');

  await User.deleteMany();

  await User.create({
    username: 'granny',
    email: 'grannysmith@testmail.com',
    password: 'password12345',
    seller: true
  });

  await User.create({
    username: 'KnitMaster',
    email: 'knitmaster@testmail.com',
    password: 'password54321',
    seller: true
  });

  console.log('users seeded');

  await Sweater.deleteMany();

  const sweaters = await Sweater.insertMany([
    {
      name: 'Christmas Time',
      description: 'Christmas Sweater with lights Size=Medium',
      image: 'christmas-sweater-light-up.jpg',
      tag: ['Chirstmas', 'Pullover'],
      price: 35,
      creater: 'granny'
    },
    {
      name: 'Spooky Sweater',
      description: 'Halloween Skull Cardigan Size=Large',
      image: 'halloween-skull-sweater.jpg',
      tag: ['Halloween', 'Cardigan'],
      price: 50,
      creater: 'granny'
    },
    {
      name: 'Black and White Sweater Vest',
      description: 'Medium black and white sweater vest with v-neck',
      image: 'black-white-sweater-vest.jpg',
      tag: ['Sweater Vest', 'V-Neck'],
      price: 30,
      creater: 'KnitMaster'
    },
    {
      name: 'Earthy Sweater',
      description: ' XL Fall sweater with squirel, rabbit, and alligator',
      image: 'earthy-animal-sweater.jpg',
      tag: ['Cardigan', 'Fall', 'Animal'],
      price: 54,
      creater: 'KnitMaster'
    },
    {
      name: 'Blue Turtleneck',
      description: 'Medium sweater that is very warm and has the THICKEST turtleneck',
      image: 'blue-turtleneck.jpg',
      tag: ['Turtleneck', 'Pullover'],
      price: 199,
      creater: 'KnitMaster'
    },
  ]);

  console.log('products seeded');

  process.exit();
});
