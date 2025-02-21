# 🌟 Lala Rental Frontend  

🚀 **Lala Frontend** is a modern, user-friendly web application for managing property rentals. Built with **React** and integrated seamlessly with the Lala Backend, this platform provides a smooth and intuitive experience for users to list, explore, and book properties.  

---

## ✨ Features  

✅ **Google Authentication** – Secure login with Google  
✅ **Property Listings** – View, create, and manage rental properties  
✅ **Role-Based Access** – Admin & User privileges  
✅ **Image Uploads** – Upload property images  
✅ **Responsive UI** – Optimized for all devices  
✅ **Booking System** – Users can book and manage reservations  

---

## 🛠️ Setup Instructions  

### **1️⃣ Install Dependencies**  

Clone the repo and navigate to the project folder:  

```sh
git clone https://github.com/Lala-Rental/lala-rental-frontend.git
cd lala-rental-frontend
npm install
```

copy ```.env.example``` into ```.env``` and provide the required keys.

### **3️⃣ Run the App**  

Start the development server:  

```sh
npm start
```

For production build:  

```sh
npm run build
```

---

## 🚀 Deployment (Docker)  

For easy deployment, use **Docker**:  

```sh
docker build -t lala-rental-frontend .
docker run -p 3000:3000 lala-rental-frontend
```

---

## 📜 License  

Lala Frontend is open-source under the **MIT License**.  
