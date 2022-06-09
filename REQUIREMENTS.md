# API Endpoints

`GET ./` - homepage

### products routes

`GET ./products` - READ all products\
`GET ./products/:productName` - READ specific product by product name\
`POST ./products` - CREATE product\
`DELETE ./products` - DELETE product by product id

### users routes

`GET ./users` - READ all users\
`GET ./users/:username` - READ specific user by username\
`POST ./users/register` - CREATE user\
`POST ./users/login` - LOGIN user\
`DELETE ./users` - DELETE specific user by username

### orders routes

`GET ./orders` - READ all orders\
`GET ./orders/:userId` - READ orders by user id\
`POST ./orders` - CREATE order\
`DELETE ./orders` - DELETE specific order by order id\
`POST ./orders/products` - CREATE order with product quantity and product id\
`DELETE ./orders/products` - DELETE order product by order product id

# Database Schema

```shell
Table "public.products"
 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           | not null |
 price  | integer                |           | not null |


```

```shell
Table "public.users"
Column    |          Type           | Collation | Nullable |              Default
----------+-------------------------+-----------+----------+-----------------------------------
id        | integer                 |           | not null | nextval('users_id_seq'::regclass)
firstname | character varying(255)  |           |          |
lastname  | character varying(255)  |           |          |
username  | character varying(255)  |           |          |
password  | character varying(1024) |           |          |


TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

```shell
Table "public.orders"
Column  |          Type          | Collation | Nullable |              Default
--------+------------------------+-----------+----------+--------------------------------------
id      | integer                |           | not null | nextval('orders_id_seq'::regclass)
status  | character varying(100) |           |          |
user_id | bigint                 |           |          |




"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

```shell
Table "public.order_products"
Column     |  Type   | Collation | Nullable |                  Default
-----------+---------+-----------+----------+--------------------------------------------------
id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
quantity   | integer |           |          |
order_id   | bigint  |           |          |
product_id | bigint  |           |          |




Foreign keys:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
