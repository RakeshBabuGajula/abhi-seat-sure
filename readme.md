# 🚌 Abhi’s SeatSure  
### Smart, Flexible & Reliable Bus Ticket Booking Platform

Abhi’s SeatSure is a next-generation bus ticket booking system inspired by **AbhiBus**, designed to solve one of the biggest real-world travel problems — **lack of flexibility after booking**.

This project introduces a **Flexi Ticket** concept that allows passengers to **ReBook or ReSell** their tickets instead of losing money due to cancellations.

> 💡 *This idea was born from a real-life incident I personally faced while booking a bus ticket.*

---

## 🚀 Project Vision

To help bus booking platforms like **AbhiBus**:
- Increase user confidence
- Reduce cancellations
- Improve repeat bookings
- Drive higher revenue
- Become the most trusted bus booking app in India

---

## 🎯 Key Features

- 📱 OTP-based user authentication (mock)
- 🔍 Bus search with source, destination & date
- 🚌 Bus listing with **ReBook probability %**
- 🪑 Interactive seat selection (Lower & Upper berth)
- 👤 Passenger details management
- 🎟️ Flexi Ticket Add-On (₹50)
- 💳 Secure payment flow (simulated)
- 📂 Bookings dashboard
- 🎫 Detailed ticket view
- 🔁 **ReBook & ReSell options**
- 🏷️ Ticket status tracking:
  - Active
  - ReBooked
  - Reselled
- 🧭 Mobile-app-like UI with bottom navigation

---

## ⭐ Flexi Ticket Concept

For just **₹50**, users unlock powerful flexibility options:

### 🔁 ReBook
Change travel plans instead of cancelling.

### 🔄 ReSell
Resell your ticket to another passenger and recover money.

This turns **uncertainty into confidence**.

---

## 🔁 ReBook – How It Works

### Eligibility
- Flexi Ticket Add-On required
- Allowed only once per ticket
- Must be before bus departure

### Rules
- Change journey date, bus service, or both
- **Fare Difference Logic**:
  - New fare > Old fare → Pay only the difference
  - New fare ≤ Old fare → No payment required
- Old ticket is marked as **ReBooked**
- Old ticket cannot be opened again
- New ticket becomes active

### Benefits
- No cancellation penalties
- Flexible planning
- Seamless journey modification

---

## 🔄 ReSell – How It Works

### Eligibility
- Flexi Ticket Add-On required
- Allowed until departure time

### Rules
- Ticket is resold only if another user books the same seat(s)
- If resold before departure → **100% refund** (excluding add-on)
- If not resold → **50% refund** after departure
- Refund processed in 5–7 working days
- Flexi add-on charges are non-refundable

### Benefits
- Recover ticket value
- Reduce last-minute losses
- Smart alternative to cancellation

---

## 🧭 User Flow

1. Login with OTP  
2. Search buses  
3. Select bus & seats  
4. Enter passenger details  
5. Add Flexi Ticket (optional)  
6. Make payment  
7. View booking in dashboard  
8. Use ReBook or ReSell if needed  

---

## 🖥️ Tech Stack

### Frontend
- React.js
- React Router
- JavaScript (ES6+)
- CSS / Tailwind CSS

### Backend (Mock)
- Node.js
- Express.js
- Mock APIs / in-memory data

### Tools
- Git & GitHub
- VS Code

---

## 📸 Demo

🎥 **Demo Video:**
👉 https://youtu.be/vEWwVCTm71Q?si=mWjMJQd7L26SeznS

📃 **PPT**:**
https://docs.google.com/presentation/d/1gKEXBtCgD0xh0pWyVYrHdJN70ZcZfsDi/edit?usp=drive_link&ouid=108722834440786058159&rtpof=true&sd=true

---

## 📂 Repository Structure
abhibus-seatsure/
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── routes/
│ ├── styles/
│ └── App.js
├── public/
├── package.json
└── README.md

---

## 📈 Business Impact

With Abhi’s SeatSure, platforms like AbhiBus can:

- 📥 Increase early bookings
- 🤝 Build stronger user trust
- 🔄 Convert cancellations into opportunities
- 💰 Generate additional revenue via Flexi Add-On
- ⭐ Stand out from competitors

---

## 🔮 Future Enhancements

- AI-based resale probability prediction
- Dynamic pricing for ReBook
- Wallet & loyalty points
- Operator analytics dashboard
- Mobile app (Android / iOS)
- Real-time resale matching

---

## 🙋‍♂️ About Me

**Rakesh**  
Computer Science Engineering Student  
 AI/ML / AI Agentic / Full Stack  

🔗 LinkedIn: https://www.linkedin.com/in/rakesh-babu-gajula/   

> I’m open to internships, collaborations, and feedback.

---

## 🙏 Thank You

If you liked this project:
- ⭐ Star the repository  
- 🎥 Watch the demo video  
- 💬 Share your feedback  
- 🤝 Let’s connect on LinkedIn  


