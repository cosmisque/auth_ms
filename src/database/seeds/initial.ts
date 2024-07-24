import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("carts").del();

  await knex("carts").insert([
    { name: "Cart 1", userId: 1 },
    { name: "Cart 2", userId: 2 },
  ]);

  await knex("cart_items").del();

  await knex("cart_items").insert([
    { name: "Item 1", price: 19.99, quantity: 2, cartId: 1 },
    { name: "Item 2", price: 9.99, quantity: 3, cartId: 1 },
    { name: "Item 3", price: 14.99, quantity: 1, cartId: 2 },
  ]);
}
