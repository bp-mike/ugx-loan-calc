import { useState } from "react";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { Notification } from "@mantine/core";
import { FcCalculator } from "react-icons/fc";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [rate, setRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyInterest, setMonthlyInterest] = useState("0");
  const [monthlyPayment, setMonthlyPayment] = useState("0");
  const [totalInterest, setTotalInterest] = useState("0");
  const [showNotification, setShowNotification] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleCalculate = () => {
    if (!loanAmount) {
      setValidationError({
        title: "Loan Amount Missing",
        body: "load amount is required",
      });
      return setShowNotification(true);
    } else if (!rate) {
      setValidationError({
        title: "Rate is Missing",
        body: "Yearly rate is required",
      });
      return setShowNotification(true);
    } else if (!loanTerm) {
      setValidationError({
        title: "Loan term is Missing",
        body: "Loan Term is required",
      });
      return setShowNotification(true);
    } else {
      // calculations
      // Monthly Interest Rate (in decimal form) = (Annual Interest Rate / 100) / 12
      setMonthlyInterest((rate / 100 / 12));
      // Number of Monthly Payments = Loan Term (in years) * 12
      let numberOfMonthlyPayments = loanTerm * 12;
  
      // Monthly Payment Amount (in Ugandan Shillings) = Loan Amount * (Monthly Interest Rate) / (1 - (1 + Monthly Interest Rate)^(-Number of Monthly Payments))
      const monthlyPaymentAmount =
        (parseInt(loanAmount) * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -numberOfMonthlyPayments));
      const totalInterestPaid =
        monthlyPaymentAmount * numberOfMonthlyPayments - loanAmount;
  
      setTotalInterest(totalInterestPaid.toFixed(2));
      setMonthlyPayment(monthlyPaymentAmount.toFixed(2));
    }
  };

  const handleClear = () => {
    setLoanAmount("");
    setRate("");
    setLoanTerm("");
    setMonthlyInterest("0");
    setMonthlyPayment("0");
    setTotalInterest("0");
  };

  return (
    <>
      <div className="border p-4 loan-calc relative ">
        {showNotification && (
          <Notification
            className="absolute top-0 left-0 w-full"
            color="orange"
            title={validationError.title}
            onClose={() => setShowNotification(false)}
          >
            {validationError.body}
          </Notification>
        )}
        <div className="flex justify-center">
          <FcCalculator className="text-5xl" />
        </div>
        <h1 className="text-3xl text-center mb-2">
          UGX Loan Calculator
        </h1>

        <div className="bg-gray-600 text-white rounded p-4 text-center">
          <p>monthly payment UGX: {monthlyPayment}</p>
          <p>total interest UGX: {totalInterest}</p>
        </div>

        <Input.Wrapper label="loan amount" className="mt-2">
          <Input
            placeholder="Input inside loan amount"
            value={loanAmount}
            onInput={(e) => setLoanAmount(e.target.value)}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="annual interest rate (in percentage)"
          className="my-2"
        >
          <Input
            placeholder="Input inside annual interest rate"
            value={rate}
            onInput={(e) => setRate(e.target.value)}
          />
        </Input.Wrapper>

        <Input.Wrapper label="loan term (in years)">
          <Input
            placeholder="Input loan term (in years)"
            value={loanTerm}
            onInput={(e) => setLoanTerm(e.target.value)}
          />
        </Input.Wrapper>
        <div className="flex justify-between">
          <Button
            radius="xl"
            className="mb-2 bg-gray-600 hover:bg-gray-500 w-2/5 mt-2"
            onClick={handleCalculate}
          >
            Calculate
          </Button>

          <Button
            radius="xl"
            className="mb-2 bg-orange-600 hover:bg-orange-500 w-2/5 w- mt-2"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
