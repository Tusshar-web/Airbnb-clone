# Airbnb Clone 🏡

A full-stack web application inspired by Airbnb, built with **Node.js**, **Express**, **MongoDB**, **EJS**, and styled using **TailwindCSS** and custom CSS. This project demonstrates building a multi-role property marketplace where users can act as guests or hosts.

---

## ✨ Features

### 👤 Authentication & Roles
- **Secure Authentication:** User sign-up and login securely hashed with `bcryptjs`. Form inputs are thoroughly validated using `express-validator`.
- **Role-Based Workflows:** Users choose to register as either a **Host** or **Guest**, each with their own tailored features and navigation bars.
- **Session Management:** Secure user sessions stored in MongoDB using `express-session` and `connect-mongo`.

### 🏨 Host Experience (Property Management)
- **Add Homes:** Hosts can list their properties providing details such as property name, description, price, location, and ratings. They can also seamlessly **upload property photos** directly to the server.
- **Manage Listings:** Hosts have access to a dedicated dashboard to view, edit, and manage all their actively listed homes, including updating and replacing photos.

### ✈️ Guest Experience (Discovery & Booking)
- **Discover Properties:** Browse through the entire home marketplace.
- **Favorites:** Guests can save appealing homes into their personal Favorites list.
- **Bookings:** Guests can track the homes they have booked directly from their Bookings tab.

### 🎨 Design & UI
- **Airbnb-Inspired Esthetics:** Designed using modern CSS, fluid layouts, cohesive colors, and subtle entrance animations to replicate an authentic, premium hospitality experience.
- **Tailwind Integration:** Utilizing Tailwind V4 (`@tailwindcss/cli`) for atomic utility styling, combined with custom CSS classes for components like cards and beautiful gradient auth screens.

---

## 🛠️ Tech Stack & Dependencies

- **Backend:** Node.js, Express (v5.x)
- **Database:** MongoDB via Mongoose
- **Templating:** EJS
- **Styling:** CSS + TailwindCSS V4
- **Security & Validation:** `bcryptjs`, `express-validator`
- **Session Store:** `express-session`, `connect-mongo`
- **File Uploads:** `multer` for robust local image storage


---

## 🚀 Getting Started

Follow these instructions to run the application securely on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed
- Accessible [MongoDB URI](https://www.mongodb.com/) (Local server or MongoDB Atlas)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd airbnb
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   If required by your configuration, specify your `MONGO_URL` in `utils/database.js` or through a `.env` file!

### Run the Application

The application requires both the node server and the Tailwind CLI watch process to run gracefully side by side. Run the following single command to start both in concurrently:
```bash
npm start
```
*Note: This command runs `nodemon app.js & npm run tailwind` behind the scenes.*

**The application will be accessible at:**
`http://localhost:2008`

---

## 📂 Project Structure

- **`/app.js`**: Application entry point, initializing express, sessions, routes, and mongoDB connections.
- **`/controllers`**: Handling business and routing logic (e.g., `authController.js`, `storeController.js`).
- **`/models`**: Mongoose schemas defining our Data structures (`User`, `Home`, `Favourite`).
- **`/routes`**: Express routers determining pathways structure (`authRouter`, `hostRouter`, `storeRouter`).
- **`/views`**: EJS templates including views for authorization, navigation partials, host-views, and guest store views.
- **`/public`**: Publicly accessible static assets, output CSS, and styling sheets.

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit PRs.

## 📝 License

This project is licensed under the **ISC** License.

## 👨‍💻 Author

- **Tusshar Singh**
