# 校园外卖群聚合平台 MVP (Vue)

Vue 3 + Vite web frontend MVP for **campus peripheral food delivery aggregation** — restaurants and shops near campus (not cafeteria stalls). UI/UX is modeled after **Meituan / Ele.me** (美团/饿了么 style), with card-based layouts, promo tags, ratings, and rich merchant/dish imagery.

## Design System

- **Primary color**: Meituan Yellow `#FFD000`
- **Style**: modern consumer delivery app UI — card-based merchants, hero images, promo tags, price emphasis
- **Layout**: fully responsive:
  - 📱 **Mobile (H5)**: bottom tab bar navigation, full-width cards, 44px tap targets
  - 🖥️ **Desktop**: top navigation bar, max-width container, hover effects

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
```

> **Mobile preview**: open http://localhost:5173 on a phone or use browser DevTools → Toggle Device Toolbar (iPhone/Android preset).

## Page Map

### Shared
- `/login` — role switch login (customer / merchant / rider)
- `/profile` — user profile
- `/addresses` — address management

### Customer (Meituan-style)
- `/customer/home` — location + search bar · category grid · promo banner carousel · merchant cards with images
- `/customer/merchant/:id` — hero image header · menu/reviews tabs · dish cards with images + add-to-cart
- `/customer/cart` — cart + checkout
- `/customer/orders` — order list with status chips
- `/customer/orders/:id` — order detail with progress timeline
- `/customer/review/:orderId` — review entry

### Merchant
- `/merchant/dashboard` — merchant dashboard
- `/merchant/dishes` — dish management
- `/merchant/orders` — order management + status updates

### Rider
- `/rider/orders` — available delivery orders
- `/rider/delivery/:id` — active delivery detail + status updates

## Data Model

Core entities are typed in `src/types/models.ts` and mocked in `src/mocks/data.ts`:
`user`, `merchant` (with `imageUrl`, `deliveryTime`, `deliveryFee`, `monthSales`), `dish` (with `imageUrl`, `salesCount`), `order`, `order_item`, `delivery`, `review`, `promotion`, `user_address`.

Order status flow: `placed → paid → accepted → delivering → completed` (also: `canceled`, `refunded`).

Merchant images use public-domain placeholders from `picsum.photos` — no auth required.

