import { useState } from "react";

function App() {
  const [housePrice, setHousePrice] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [loanTermYears, setLoanTermYears] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Mortgage Calculator</h1>

      <input
        type="number"
        placeholder="House Price"
        value={housePrice}
        onChange={(e) => setHousePrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        value={annualInterestRate}
        onChange={(e) => setAnnualInterestRate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Loan Term (years)"
        value={loanTermYears}
        onChange={(e) => setLoanTermYears(e.target.value)}
      />

      <button onClick={handleCalculate}>Calculate</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <h2>Monthly Payment: ${result}</h2>}
    </div>
  );
}

export default App;