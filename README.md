# 📊 Data Visualization Web App

A full-stack web application for uploading, analyzing, and visualizing datasets with multiple chart types — built with **React**, **Django**, and **Chart.js**.

## 🚀 Features

* **Dataset Upload & Management**

  * Upload CSV files to the backend
  * View dataset details, timestamps, and frequency distributions
  * Delete datasets from the database

* **Interactive Data Visualizations**

  * Bar Charts, Line Charts, Scatter Plots, Pie Charts, Histograms, Frequency Bars
  * Numeric sorting on X-axis
  * Custom axis labels, colors, and themes
  * Data grouped by category or numerical ranges

* **User Experience**

  * Scrollable table view within a fixed container
  * Fully responsive chart layouts
  * Dark-themed visualizations with white labels & gridlines


## 🛠 Tech Stack

**Frontend:** React, Chart.js, react-chartjs-2, HTML, CSS  
**Backend:** Django, Django REST Framework  
**Database:** SQLite (default, can switch to PostgreSQL/MySQL)  
**Other:** Fetch API for REST calls, JSON for data exchange  


## 📂 Project Structure


/frontend   → React app (UI & charts)  
/backend    → Django app (API & DB handling)


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/data-viz-app.git
cd data-viz-app
```

### 2️⃣ Backend (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will start at: `http://localhost:8000`

### 3️⃣ Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

Frontend will start at: `http://localhost:3000`


## 📸 Screenshots

<img width="1470" height="799" alt="Screenshot 2025-08-14 at 10 35 34 PM" src="https://github.com/user-attachments/assets/b4bbbf89-2367-4580-9435-f264a31675f8" />
<img width="1470" height="799" alt="Screenshot 2025-08-14 at 10 35 44 PM" src="https://github.com/user-attachments/assets/f008abc2-ff63-4625-8ea3-dd720f704aa5" />
<img width="1470" height="797" alt="Screenshot 2025-08-14 at 10 36 00 PM" src="https://github.com/user-attachments/assets/d86af3ad-44b3-4b10-9f92-fbc438c8aea9" />
<img width="1470" height="798" alt="Screenshot 2025-08-14 at 10 42 07 PM" src="https://github.com/user-attachments/assets/cd4676ea-8677-4d92-b2f5-29d468f244f2" />
<img width="1470" height="799" alt="Screenshot 2025-08-14 at 10 37 22 PM" src="https://github.com/user-attachments/assets/753893f2-fad1-44de-8942-6b71b9873fad" />
<img width="1470" height="797" alt="Screenshot 2025-08-14 at 10 39 11 PM" src="https://github.com/user-attachments/assets/a4fe4bda-91d9-4e63-b31d-9bb9868b65bd" />
<img width="1470" height="799" alt="Screenshot 2025-08-14 at 10 40 24 PM" src="https://github.com/user-attachments/assets/3f3e95a6-6931-49d0-bd3b-52454574d47a" />
<img width="1470" height="798" alt="Screenshot 2025-08-14 at 10 40 35 PM" src="https://github.com/user-attachments/assets/3f7d1719-0104-441a-abc7-af8f2e7cdb58" />
<img width="1470" height="798" alt="Screenshot 2025-08-14 at 10 40 46 PM" src="https://github.com/user-attachments/assets/9f92f4d2-d145-429b-8354-faaa0333aff8" />
<img width="1470" height="799" alt="Screenshot 2025-08-14 at 10 41 12 PM" src="https://github.com/user-attachments/assets/431fc5e1-e48b-4444-b888-f532646c135b" />
<img width="1470" height="798" alt="Screenshot 2025-08-14 at 10 41 25 PM" src="https://github.com/user-attachments/assets/81b5cfdb-fb25-402a-ad89-1cf763b6e5eb" />
<img width="1470" height="797" alt="Screenshot 2025-08-14 at 10 41 38 PM" src="https://github.com/user-attachments/assets/2c6e313e-441e-4752-aade-b17735d736f9" />
<img width="1470" height="797" alt="Screenshot 2025-08-14 at 10 41 53 PM" src="https://github.com/user-attachments/assets/2d4a6156-adc0-46b0-a270-a168a25d0421" />



## 🔐 Authentication

* Uses Django session authentication (with `credentials: "include"` in fetch requests)
* Can be extended with JWT tokens or OAuth


## 🧹 Future Improvements

* CSV preview before upload
* Export charts as PNG/PDF
* User authentication & dataset privacy
* Support for larger datasets with server-side aggregation
