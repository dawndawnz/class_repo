# Campus Food Delivery Aggregation MVP (Vue)

Vue 3 + Vite web frontend MVP for university food delivery aggregation, covering customer / merchant / rider flows with mock services for future Java EE REST API replacement.

## Run

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

## MVP Page Map

### Shared
- `/login` role switch login (customer / merchant / rider)
- `/profile` user profile
- `/addresses` address management

### Customer
- `/customer/home` merchant list + promotions
- `/customer/merchant/:id` merchant detail + dish list
- `/customer/cart` cart and checkout
- `/customer/orders` order list
- `/customer/orders/:id` order detail + status timeline
- `/customer/review/:orderId` review entry

### Merchant
- `/merchant/dashboard` merchant dashboard
- `/merchant/dishes` dish management list
- `/merchant/orders` order management + status updates

### Rider
- `/rider/orders` available delivery orders
- `/rider/delivery/:id` active delivery detail + status updates

## Data Model (Mocked)
Core entities are typed and mocked to align with the process/ER scope:
`user`, `merchant`, `dish`, `orders`, `order_item`, `delivery`, `review`, `promotion`, `user_address`.

Status enum mapping includes:
`placed`, `paid`, `accepted`, `delivering`, `completed`, `canceled`, `refunded`.
