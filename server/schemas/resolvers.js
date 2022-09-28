const { AuthenticationError } = require('apollo-server-express');
const { User, Sweater, Tag, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    tags: async () => {
      return await Tag.find();
    },
    sweaters: async (parent, { tag, name }) => {
      const params = {};
      if (tag) {
        params.tag = tag;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Sweater.find(params).populate('tag');
    },
    sweater: async (parent, { _id }) => {
      return await Sweater.findById(_id).populate('tag');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.sweaters',
          populate: 'tag'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.sweaters',
          populate: 'tag'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ sweaters: args.sweaters });
      const line_items = [];

      const { sweaters } = await order.populate('sweaters');

      for (let i = 0; i < sweaters.length; i++) {
        const sweater = await stripe.products.create({
          name: sweaters[i].name,
          description: sweaters[i].description,
          images: [`${url}/images/${sweaters[i].image}`]
        });

        const price = await stripe.prices.create({
          product: sweater.id,
          unit_amount: sweaters[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { sweaters }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ sweaters });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    addSweater: async (parent, { name, creater, description, image, price, tag }, context) => {
      if (context.user) {
        return await Sweater.create({ name, creater, description, image, price, tag });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateSweater: async (parent, { name, description, price, tag }, context) => {
      if (context.user) {
        return await Sweater.findByIdAndUpdate(context.user._id, { name, description, price, tag }, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
