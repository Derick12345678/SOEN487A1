# SOEN487 Assignment 1

Mortgage Calculator built with:

- **Frontend:** TypeScript + Vite  
- **Backend:** TypeScript + Express  

---

## Project Structure

```
root/
│
├── frontend/   # Vite + TypeScript 
└── backend/    # Express + TypeScript 
```

---

## Getting Started

### 1️. Clone the Repository

```bash
git clone https://github.com/Derick12345678/SOEN487A1.git
cd SOEN487A1
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---
## Example Inputs and Outputs

### Example 1

**Request**
```json
POST /calculate-mortgage

{
  "housePrice": 500000,
  "annualInterestRate": 5,
  "loanTermYears": 25
}
```

**Response**
```json
{
  "monthlyPayment": 2923.95
}
```

---

### Example 2

**Request**
```json
POST /calculate-mortgage

{
  "housePrice": 350000,
  "annualInterestRate": 3.5,
  "loanTermYears": 20
}
```

**Response**
```json
{
  "monthlyPayment": 2029.86
}
```

---

