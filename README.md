# 🏠 Airbnb Clone

A full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS. Users can browse homes, view details, and save favourites. Hosts can list, edit, and delete their properties.

---

## 🚀 Features

- **Browse Homes** — View all listed properties with photos, price, location, and rating
- **Home Details** — Click any listing to see its full description and details
- **Add / Edit / Delete Homes** — Hosts can manage their property listings
- **Favourites** — Save homes to a personal favourites list
- **Bookings Page** — View available homes for booking

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Styling | Tailwind CSS + Custom CSS |

---

## 📁 Project Structure

```
airbnb/
├── controllers/
│   ├── hostController.js      # Host-side logic (add, edit, delete homes)
│   └── storeController.js     # Guest-side logic (browse, favourites, details)
├── models/
│   ├── home.js                # Mongoose schema for home listings
│   └── fav.js                 # Mongoose schema for favourites
├── routes/
│   ├── hostRouter.js          # Routes for host actions
│   └── storeRouter.js         # Routes for guest actions
├── views/
│   ├── host/                  # EJS templates for host pages
│   ├── store/                 # EJS templates for guest pages
│   └── partials/              # Shared partials (nav, etc.)
├── utils/
│   └── database.js            # MongoDB connection utility
├── public/                    # Static assets (CSS, images)
└── app.js                     # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb://localhost:27017/airbnb
PORT=2008
```

### Run the App

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Visit `http://localhost:2008` in your browser.

---

## 📌 Routes Overview

### Guest Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Home / index page |
| GET | `/store/home-list` | Browse all homes |
| GET | `/store/home-detail/:homeid` | View a single home |
| GET | `/store/fav-list` | View favourites |
| POST | `/store/add-fav/:homeId` | Add a home to favourites |
| POST | `/store/remove-fav/:homeId` | Remove from favourites |
| GET | `/store/booking` | Bookings page |

### Host Routes

| Method | Route | Description |
|---|---|---|
| GET | `/host/add-home` | Add home form |
| POST | `/host/add-home` | Submit new home |
| GET | `/host/host-home-list` | View all listed homes |
| GET | `/host/edit-home/:homeId` | Edit home form |
| POST | `/host/edit-home/:homeId` | Submit edited home |
| POST | `/host/delete-home/:homeId` | Delete a home |

---

Author ~ Tusshar Singh
