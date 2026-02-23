import { Request, Response } from "express";

export const calculateMortgage = (req: Request, res: Response) => {
  const { housePrice, annualInterestRate, loanTermYears } = req.body;

  if (
    housePrice == null ||
    annualInterestRate == null ||
    loanTermYears == null
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (housePrice <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
    return res
      .status(400)
      .json({ error: "Values must be positive numbers." });
  }

  const P = housePrice;
  const r = annualInterestRate / 100 / 12;
  const n = loanTermYears * 12;

  let monthlyPayment: number;

  if (r === 0) {
    monthlyPayment = P / n;
  } else {
    monthlyPayment =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
  }

  res.json({
    monthlyPayment: Number(monthlyPayment.toFixed(2))
  });
};