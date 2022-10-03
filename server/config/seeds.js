const db = require('./connection');
const { User, Sweater, Tag } = require('../models');

db.once('open', async () => {
  await Tag.deleteMany();

  const tags = await Tag.insertMany([
    { name: 'Holloween' }, // 0
    { name: 'Thanksgiving' }, 
    { name: 'Christmas' }, // 2
    { name: 'Hanukkah'},
    { name: 'Fall' }, // 4
    { name: 'Winter' },
    { name: 'Cardigan' }, // 6
    { name: 'Pullover' },
    { name: 'Crewneck' }, // 8
    { name: 'V-Neck' },
    { name: 'Turtleneck' }, // 10
    { name: 'Sweater Vest' },
    { name: 'Animal'} // 12
  ]);

  console.log('Tags seeded');

  await User.deleteMany();

  const granny = await User.create({
    username: 'granny',
    email: 'grannysmith@testmail.com',
    password: 'password12345',
    seller: true
  });

  const KnitMaster = await User.create({
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
      tag: [tags[2]._id, tags[7]._id], 
      price: 35,
      creator: granny._id
    },
    {
      name: 'Spooky Sweater',
      description: 'Halloween Skull Cardigan Size=Large',
      image: 'halloween-skull-sweater.jpg',
      tag: [tags[0]._id, tags[6]._id], 
      price: 50,
      creator: granny._id
    },
    {
      name: 'Black and White Sweater Vest',
      description: 'Medium black and white sweater vest with v-neck',
      image: 'black-white-sweater-vest.jpg',
      tag: [tags[9]._id, tags[11]._id], 
      price: 30,
      creator: KnitMaster._id
    },
    {
      name: 'Earthy Sweater',
      description: ' XL Fall sweater with squirel, rabbit, and alligator',
      image: 'earthy-animal-sweater.jpg',
      tag: [tags[4]._id, tags[6]._id, tags[12]._id], 
      price: 54,
      creator: KnitMaster._id
    },
    {
      name: 'Blue Turtleneck',
      description: 'Medium sweater that is very warm and has the THICKEST turtleneck',
      image: 'blue-turtleneck.jpg',
      tag: [tags[7]._id, tags[10]._id], 
      price: 199,
      creator: KnitMaster._id
    },
  ]);

  const granny2 = await User.findOneAndUpdate({'username': 'granny'}, {'shop': [sweaters[0]._id, sweaters[1]._id]}, {new: true})

  const KnitMaster2 = await User.findOneAndUpdate({'username': 'KnitMaster'}, {'shop': [sweaters[2]._id, sweaters[3]._id, sweaters[4]._id]}, {new: true})

  console.log('sweaters seeded');
  console.log(granny2);

  process.exit();
});
