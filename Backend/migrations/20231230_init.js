exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').defaultTo('user');
      table.string('first_name');
      table.string('last_name');
      table.string('phone');
      table.text('address');
      table.timestamps(true, true);
    })
    .createTable('categories', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.timestamps(true, true);
    })
    .createTable('products', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('quantity').notNullable().defaultTo(0);
      table.integer('category_id').references('id').inTable('categories').onDelete('SET NULL');
      table.string('image_url');
      table.timestamps(true, true);
    })
    .createTable('carts', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('cart_items', table => {
      table.increments('id').primary();
      table.integer('cart_id').references('id').inTable('carts').onDelete('CASCADE');
      table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.timestamps(true, true);
    })
    .createTable('orders', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
      table.string('status').notNullable().defaultTo('pending');
      table.decimal('total_amount', 10, 2).notNullable();
      table.text('shipping_address');
      table.string('payment_status').defaultTo('pending');
      table.string('payment_method');
      table.timestamps(true, true);
    })
    .createTable('order_items', table => {
      table.increments('id').primary();
      table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE');
      table.integer('product_id').references('id').inTable('products').onDelete('SET NULL');
      table.integer('quantity').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('cart_items')
    .dropTableIfExists('carts')
    .dropTableIfExists('products')
    .dropTableIfExists('categories')
    .dropTableIfExists('users');
};
