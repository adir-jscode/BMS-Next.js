# 🚀 BMS-ERP (Bank Management System - ERP)

BMS-ERP is a robust **Bank Management System** designed for employees to manage customers, accounts, transactions, loans, and more. This system provides a seamless **ERP solution** for banks with efficient API endpoints for authentication, customer management, and financial transactions.

## 📌 Features

✅ **User Authentication & Security**  
- Signup, Login, OTP Verification  
- Profile Management  

✅ **Customer & Account Management**  
- Retrieve all customers & accounts  
- Update customer information  
- Create, update, activate, or deactivate accounts  

✅ **Transactions & Loans**  
- Perform transactions via email  
- Loan creation and repayment  
- Retrieve all loans  

✅ **Mail & Reports**  
- Automated email notifications  
- Transaction reporting  

---

## 🏰 Tech Stack

- **Backend**: NestJS (Node.js, TypeScript)  
- **Database**: PostgreSQL / MySQL  
- **Authentication**: JWT (JSON Web Tokens)  
- **API Documentation**: Postman  
- **Deployment**: Docker, AWS  

---

## 📦 Installation & Setup

### 🔹 Prerequisites
- Install [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/)  
- Install PostgreSQL or MySQL  
- Install **Postman** for testing APIs  

### 🔹 Clone the Repository
```sh
git clone https://github.com/your-username/bms-erp.git
cd bms-erp
```

### 🔹 Install Dependencies
```sh
npm install
```

### 🔹 Environment Variables
Create a `.env` file and configure:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 🔹 Run the Server
```sh
npm run start
```

### 🔹 API Documentation
Import the **Postman Collection** to test APIs.

---

## 🐿️ API Endpoints

### 🔒 **Authentication**
| Method | Endpoint           | Description |
|--------|-------------------|-------------|
| `POST` | `/signup`         | User Registration |
| `POST` | `/verify-otp`     | OTP Verification |
| `POST` | `/login`          | User Login |
| `GET`  | `/profile`        | Get User Profile |

### 👥 **Customer Management**
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| `GET`  | `/customers`               | Get All Customers |
| `PUT`  | `/customers/update`        | Update Customer Info |
| `DEL`  | `/customers/delete`        | Delete Customer |
| `POST` | `/customers/create`        | Create New Customer |

### 🏦 **Account Management**
| Method | Endpoint                 | Description |
|--------|-------------------------|-------------|
| `POST` | `/account/create`       | Create Account (Email) |
| `GET`  | `/accounts`             | Get All Accounts |
| `POST` | `/account/deactivate`   | Deactivate Account |
| `POST` | `/account/activate`     | Activate Account |
| `PATCH`| `/account/update`       | Update Account |

### 💳 **Transactions & Loans**
| Method | Endpoint                   | Description |
|--------|---------------------------|-------------|
| `POST` | `/transaction/email`       | Perform Transaction via Email |
| `POST` | `/loan/create`             | Create a New Loan (Email) |
| `GET`  | `/loans`                   | Get All Loans |
| `PATCH`| `/loan/repay`              | Loan Repayment |

### 📊 **Reports & Notifications**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| `POST` | `/mailer/test`   | Send a Test Email |
| `PATCH`| `/report`        | Generate Transaction Report |

---

## 🚀 Deployment
To deploy BMS-ERP, follow these steps:
```sh
npm run build
npm start
```
For **Docker Deployment**:
```sh
docker-compose up -d
```

---

## 🐝 License
This project is licensed under the **MIT License**.

---

## 📞 Contact
For support or contributions, feel free to reach out:
- 📧 Email: support@bank.com  
- 🌐 Website: [Bank ERP System](https://yourwebsite.com)  
- 🐙 GitHub: [Your Repository](https://github.com/your-username/bms-erp)  

---

