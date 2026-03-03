# Lumière Dining

A full-featured fine dining restaurant web application built with Next.js 14, featuring online ordering, user authentication, menu browsing, a newsletter/blog system, and more.

---

## Features

**Authentication & User Management**
- Sign up, sign in, forgot password, and password reset flows
- JWT-based sessions (30-day expiry) via NextAuth
- Profile management with avatar upload (Cloudinary)
- Newsletter subscription tracking

**E-Commerce & Ordering**
- Browse menu by category (Starters, Mains, Desserts, Beverages, etc.)
- Shopping cart with session storage persistence
- Promo code support (25% discount)
- Checkout with credit card validation (Visa, Mastercard, Amex, Discover)
- Tax (8%) and service charge (15%) calculation
- Order history and PDF download
- Order confirmation emails

**Engagement**
- 1–5 star product reviews
- Newsletter/blog with comments, replies, and likes
- Photo gallery with masonry layout
- Contact form

**Other**
- Cookie consent banner
- Legal pages (Privacy Policy, Terms, Refund, Cancellation, Cookie Policy)
- Restaurant story and directions modal
- Reservations page (coming soon)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript 5 |
| Styling | Tailwind CSS, Shadcn/ui, Radix UI, Lucide Icons |
| Auth | NextAuth v4 (Credentials), bcryptjs |
| Database | MongoDB (Mongoose) |
| Forms | React Hook Form, Zod |
| Email | Nodemailer (Gmail SMTP) |
| Media | Cloudinary |
| PDF | @react-pdf/renderer |
| Fonts | Playfair Display, Inter (@fontsource-variable) |
| Notifications | Sonner |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Gmail account with 2FA and an [App Password](https://support.google.com/accounts/answer/185833)
- A [Cloudinary](https://cloudinary.com) account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your-mongodb-connection-string

# Gmail SMTP
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Cache revalidation
REVALIDATE_SECRET=your-revalidation-secret
```

> **Gmail setup:** Enable 2FA on your Google Account, then generate a 16-character App Password under Security → App Passwords.

### 3. Seed the database

Populate the database with menu items, shop products, and newsletter posts:

```bash
npm run seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/                  # API routes (auth, menu, orders, reviews, newsletter, etc.)
│   ├── auth/                 # Sign in, sign up, forgot/reset password
│   ├── gallery/              # Photo gallery
│   ├── legal/                # Privacy, Terms, Refund, Cancellation, Cookie policies
│   ├── menu/                 # Menu listing and item detail pages
│   ├── my-account/           # Profile, orders, payment, reviews
│   ├── my-cart/              # Cart, checkout, success/failure pages
│   ├── newsletter/           # Blog posts and comments
│   ├── our-story/            # Restaurant story
│   ├── reservations/         # Reservations (coming soon)
│   ├── shop/                 # Merchandise shop
│   └── contact-us/           # Contact form
├── components/               # Shared UI components
├── context/                  # React context (cart, auth)
├── lib/                      # Utilities (MongoDB connection, helpers)
├── models/                   # Mongoose models (User, Order, Review, etc.)
├── schemas/                  # Zod validation schemas
└── types/                    # TypeScript type definitions
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |

---

## API Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/sign-up` | Register a new user |
| POST | `/api/auth/reset-password` | Initiate password reset |
| POST | `/api/auth/reset-password/confirm` | Confirm password reset |
| GET | `/api/menu` | Fetch menu data |
| GET | `/api/shop` | Fetch shop products |
| POST | `/api/checkout` | Create order and send confirmation email |
| GET/POST | `/api/user/profile` | Get or update user profile |
| POST | `/api/user/upload-avatar` | Upload avatar to Cloudinary |
| GET | `/api/user/orders` | Fetch user orders |
| GET | `/api/user/orders/download` | Download order as PDF |
| GET/POST | `/api/reviews` | Fetch or submit reviews |
| GET | `/api/reviews/[itemName]` | Fetch reviews for a specific item |
| GET | `/api/newsletter` | Fetch newsletter posts |
| GET | `/api/newsletter/[id]` | Fetch a single post |
| POST | `/api/newsletter/[id]/like` | Like a post |
| POST | `/api/newsletter/[id]/comment` | Comment on a post |
| POST | `/api/newsletter/[id]/comment/[commentId]/like` | Like a comment |
| POST | `/api/newsletter/[id]/comment/[commentId]/reply` | Reply to a comment |
| POST | `/api/contact` | Submit contact form |

---

## Deployment

The recommended platform is [Vercel](https://vercel.com). Add all environment variables from your `.env.local` to your Vercel project settings before deploying.

```bash
npm run build
```

Ensure your MongoDB Atlas cluster allows connections from your deployment IP or has network access set to allow all (0.0.0.0/0) for cloud deployments.
