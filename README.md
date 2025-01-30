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
- **Frontend**: NextJS
- **Backend**: NestJS (Node.js, TypeScript)  
- **Database**: PostgreSQL / MySQL  
- **Authentication**: JWT (JSON Web Tokens)  
- **API Documentation**: Postman
---

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

## 🚀 Backend Code

🐙 GitHub: [Code](https://github.com/adir-jscode/BMS-Web)

