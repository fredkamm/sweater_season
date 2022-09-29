import { gql } from '@apollo/client';

export const QUERY_SWEATERS = gql`
  query getSweaters($tag: ID) {
    sweaters(tag: $tag) {
      _id
      name
      creator
      description
      price
      image
      sold
      tag {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($sweaters: [ID]!) {
    checkout(sweaters: $sweaters) {
      session
    }
  }
`;

export const QUERY_ALL_SWEATERS = gql`
query GetAllSweaters{
    sweaters {
      _id
      name
      description
      image
      price
    }
  }
`;

export const QUERY_TAGS = gql`
  {
    tag {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      username
      orders {
        _id
        purchaseDate
        sweaters {
          _id
          name
          creator
          description
          price
          image
        }
      }
    }
  }
`;
