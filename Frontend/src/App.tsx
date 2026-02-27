import { useState } from "react";
import "./App.css";

function App() {
  const [housePrice, setHousePrice] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [loanTermYears, setLoanTermYears] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!housePrice || !annualInterestRate || !loanTermYears) {
      setError("All fields are required.");
      return;
    }

    if (
      Number(housePrice) <= 0 ||
      Number(annualInterestRate) < 0 ||
      Number(loanTermYears) <= 0
    ) {
      setError("Values must be positive.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/calculate-mortgage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            housePrice: Number(housePrice),
            annualInterestRate: Number(annualInterestRate),
            loanTermYears: Number(loanTermYears),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        setResult(data.monthlyPayment);
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Mortgage Calculator</h1>

        <form onSubmit={handleCalculate}>
          <div className="input-group">
            <label>House Price</label>
            <input
              type="number"
              value={housePrice}
              onChange={(e) => setHousePrice(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <input
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Loan Term (years)</label>
            <input
              type="number"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(e.target.value)}
            />
          </div>

          <button type="submit">Calculate</button>
        </form>

        {error && <p className="error">{error}</p>}

        {result !== null && (
          <div className="result">
            Monthly Payment: <strong>${result}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;