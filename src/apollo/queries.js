import { gql } from "@apollo/client";
import client from "./client";

export const getAllCategories = async () => {
  const query = gql`
    query {
      categories {
        name
      }
    }
  `;
  const res = await client.query({ query });
  return res;
};

export const getProduct = async (id) => {
  const query = gql`
    query ($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  `;

  const variables = { id };
  const res = await client.query({ query, variables });
  return res;
};

export const getCurrencies = async () => {

  const query = gql`
    {
      currencies {
        label
        symbol
      }
    }
  `;
  const res = await client.query({ query });
  return res;
};

export const getProductsByCategory = async (title = 'all') => {
  const query = gql`
    query ($title: String!) {
      category(input: {title: $title}) {
        products {
          name
          id
          gallery
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
      }
    }
  `;

  const variables = { title };
  const res = await client.query({ query, variables });
  return res;
};

export const getPriceById = async ( id ) => {
  const query = gql`
    query ($id: String!) {
      product(id: $id) {
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  `

  const variables = { id };
  const res = await client.query({ query, variables });
  return res;
}