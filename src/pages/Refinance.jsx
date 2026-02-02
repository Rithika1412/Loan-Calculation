import CalculatorTabs from "../CalculatorTabs";
import { useState } from "react";
import { useEffect } from "react";



export default function Refinance() {
  
  const [propertyType, setPropertyType] = useState("owner");
  const [paymentType, setPaymentType] = useState("pi");
  const [initialState, setInitialState]=useState({
    loanAmount:0,
    years:0,
    interestRate:0,
    propertyType:'',
    paymentType:'',
    newInterest:'',
    interestOnlyPeriod:1
  })

  function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInitialState(values => ({ ...values, [name]: value }))
    }

  

const [output, setOutput] = useState(null);

useEffect(() => {
   
    const currentBalance = Number(initialState.loanAmount);
    const currentRateAnnual = Number(initialState.interestRate);
    const totalTermYears = Number(initialState.years);
    
    
    const newRateAnnual = parseFloat(initialState.newInterest) || 0;

    if (currentBalance > 0 && totalTermYears > 0 && currentRateAnnual > 0 && newRateAnnual > 0) {
     
        const currentRateMonthly = (currentRateAnnual / 100) / 12;
        const totalMonths = totalTermYears * 12;

        const currentPIMonthly = (currentBalance * currentRateMonthly * Math.pow(1 + currentRateMonthly, totalMonths)) / 
                                 (Math.pow(1 + currentRateMonthly, totalMonths) - 1);

  
        const newRateMonthly = (newRateAnnual / 100) / 12;
        const ioYears = paymentType === "interest" ? parseInt(initialState.interestOnlyPeriod) : 0;
        const ioMonths = ioYears * 12;
        const remainingPIMonths = totalMonths - ioMonths;

        let newRepaymentMonthly = 0;
        let piAfterIO = 0;

        if (paymentType === "principle") {
  
            newRepaymentMonthly = (currentBalance * newRateMonthly * Math.pow(1 + newRateMonthly, totalMonths)) / 
                                  (Math.pow(1 + newRateMonthly, totalMonths) - 1);
        } else {

            newRepaymentMonthly = currentBalance * newRateMonthly;
         
            if (remainingPIMonths > 0) {
                piAfterIO = (currentBalance * newRateMonthly * Math.pow(1 + newRateMonthly, remainingPIMonths)) / 
                            (Math.pow(1 + newRateMonthly, remainingPIMonths) - 1);
            }
        }

      
        const monthlySavings = currentPIMonthly - newRepaymentMonthly;
        
        setOutput({
            newRepayment: newRepaymentMonthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            currentRepayment: currentPIMonthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            piAfterIO: piAfterIO.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            monthlySave: monthlySavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            yearlySave: (monthlySavings * 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            lifeSave: (monthlySavings * totalMonths).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            rate: newRateAnnual.toFixed(2),
            compRate: (newRateAnnual + 0.15).toFixed(2)
        });
    } else {
        
        setOutput(null);
    }
}, [initialState, paymentType]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Refinance Calculator</h1>
        <p className="text-gray-600 mb-8">
          Calculate how much you could save on repayments by refinancing your home loan with us. There may be costs involved with refinancing
        </p>
        <CalculatorTabs />
      </div>
      <main className="grid grid-cols-2 mt-10">
        <section className="border-2 border-gray-300">
          <div className="m-8">
            <div>
              <h5 className="md:text-4xl text-lg font-normal m-3">Your current home loan</h5>
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Current loan balance</label>
                <input
                  name="loanAmount"
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="w-2/3 border p-2 rounded" />

              </div>
              <div className="mt-5 grid grid-cosl-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Years remaining</label>
                  <select className="w-full border p-2 rounded mt-3"
                  value={initialState.years}
                  name="years"
                  onChange={handleChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>

                  </select>
                </div>
                <div>
                  <button className="block text-sm font-medium underline hover:text-blue-800">interest rate</button>
                  <div className="mt-3">

                    <input
                      name="interestRate"
                      onChange={handleChange}
                      type="number"
                      placeholder="0"
                      className="w-full border p-2 rounded" />

                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h5 className="text-4xl font-normal m-3 mt-10">Your new home loan</h5>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2 ">Property type</p>

                  <div className="flex border border-black rounded-xl overflow-hidden w-full max-w-lg mt-5">

                    <button
                      name="propertyType"
                      onChange={handleChange}
                      value={initialState.propertyType}
                      type="button"
                      onClick={() => setPropertyType("owner")}
                      className={`flex-1 py-4 text-center font-medium
            ${propertyType === "owner"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        }`}
                    >
                      Owner occupied
                    </button>


                    <button
                    name="propertyType"
                    onChange={handleChange}
                    value={initialState.propertyType}
                      type="button"
                      onClick={() => setPropertyType("investment")}
                      className={`flex-1 py-4 text-center font-medium
            ${propertyType === "investment"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        }`}
                    >
                      An investment
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">You'll be paying</p>

                <div className="flex border border-black rounded-xl overflow-hidden w-full max-w-lg mt-5">

                  <button
                    type="button"
                    name="paymentType"
                    onChange={handleChange}
                    value={initialState.paymentType}
                    onClick={() => setPaymentType("principle")}
                    className={`flex-1 py-4 text-center font-medium
            ${paymentType === "principle"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                      }`}
                  >
                    Principle & Interest
                  </button>


                  <button
                    type="button"
                    name="paymentType"
                    onChange={handleChange}
                    value={initialState.paymentType}
                    
                    onClick={() => {
                      setPaymentType("interest");
                      setInitialState(prev=> ({...prev, paymentType: "interest"}));
                    }
                    }
                    className={`flex-1 py-4 text-center font-medium
            ${paymentType === "interest"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                      }`}
                  >
                    Interest Only
                  </button>
                </div>
              </div>
            </div>
            {paymentType === "interest" && (
              <div>
                <div className="mt-5 text-sm font-normal text-gray-500">
                  <span>By selecting Interest Only you may pay more interest over the life of the loan.</span>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Interest only period
                  </label>
                  <select className="border rounded p-2 w-full mt-4"
                  value={initialState.interestOnlyPeriod}
                  name="interestOnlyPeriod"
                  onChange={handleChange}>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-5">
              <label className="block text-sm font-medium mb-1">New interest rate</label>
              <select className="border rounded p-2 w-2/3 mt-5"
              value={initialState.newInterest}
                  name="newInterest"
                  onChange={handleChange}>
                    {paymentType==="principle" && (
                      <>
                <option value="6.24">6.24% p.a. 4 Year Fixed Rate Home Loan</option>
                <option value="5.59">5.59% p.a. Simple Home Loan - Variable Rate LVR 60% or below</option>
                <option value="5.64">5.64% p.a. Simple Home Loan - Variable Rate LVR 60.01% to 70%</option>
                <option value="5.74">5.74% p.a. Simple Home Loan - Variable Rate LVR 70.01% to 80%</option>
                <option value="6.04">6.04% p.a. Simple Home Loan - Variable Rate LVR 80.01% to 90%</option>
                <option value="6.99">6.99% p.a. Simple Home Loan - Variable Rate LVR 90.01% to 95%</option>
                <option value="6.09">6.09% p.a. 1 Year Fixed Rate Home Loan</option>
                <option value="5.94">5.94% p.a. 2 Year Fixed Rate Home Loan</option>
                <option value="6.19">6.19% p.a. 3 Year Fixed Rate Home Loan</option>
                <option value="6.24">6.24% p.a. 4 Year Fixed Rate Home Loan</option>
                <option value="6.39">6.39% p.a. 5 Year Fixed Rate Home Loan</option>
                </>
                    )}
                    {paymentType==="interest" &&(
                <>

                <option value="5.83">5.83% pa. Digi Home Loan LVR 60% or below</option>
                <option value="5.86">5.86% p.a. Digi Home Loan LVR 60.01% to 70%</option>
                <option value="5.88">5.88% p.a. Digi Home Loan LVR 70.01% to 80%</option>
                <option value="6.08">6.08% p.a. Simple Home Loan - Variable Rate LVR 60% or below</option>
                <option value="6.13">6.13% p.a. Simple Home Loan - Variable Rate LVR 60.01% to 70%</option>
                <option value="6.23">6.23% p.a. Simple Home Loan - Variable Rate LVR 70.01% to 80%</option>
                <option value="6.49">6.49% p.a. 1 Year Fixed Rate Home Loan</option>
                <option value="6.34">6.34% p.a. 2 Year Fixed Rate Home Loan</option>
                <option value="6.64">6.64% p.a. 3 Year Fixed Rate Home Loan</option>
                <option value="6.69">6.69% p.a. 4 Year Fixed Rate Home Loan</option>
                <option value="6.79">6.79% p.a. 5 Year Fixed Rate Home Loan</option>
                </>
                    )}

                    
              </select>
              <h5 className="mt-5">(Comparison Rate:{ }% p.a)**</h5>
              <div className="mt-5 text-sm font-normal text-gray-500">
                <span>Loan options displayed based on property and repayment type. Savings are based on the fixed rate period and after that, using the variable rate.</span>
              </div>

            </div>
          </div>

        </section>
        <section className=" bg-gray-200">
         {paymentType === "principle" &&(
          <div className="m-8">
            
            <div>
              <h5 className="md:text-2xl text-lg font-normal md:mt-15 mt-10">Your new monthly repayments</h5>
              {output &&(
              <h3 className="text-4xl font-bold">${output.newRepayment}</h3>)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 mb-5">
              <div>
                <h5 className="md:text-2xl text-lg font-normal ">Interest Rate</h5>
                {output &&(
                <h3 className="md:text-4xl text-xl font-bold">{output.rate}%</h3>)}
              </div>
              <div>
                <h5 className="md:text-2xl text-lg font-normal ">Comparison Rate**</h5>
                {output &&(
                <h3 className="md:text-4xl text-xl font-bold">{output.compRate}%</h3>)}
              </div>


            </div>
            <hr />
            <div className="mt-5 mb-5">
              <h5 className="text-lg font-normal ">Our estimate of your current Principal and Interest monthly repayments</h5>
              {output &&(
              <h3 className="text-2xl font-semibold">${output.currentRepayment}</h3>)}
            </div>
            <hr />
            <div className="mt-5">
              <h5 className="md:text-2xl text-lg font-normal">Your new rate could save you</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                <div className="bg-white">
                  <div className="m-5">
                    <h5>Monthly</h5>
                    {output &&(
                    <h3 className="text-lg font-semibold pt-3">${output.monthlySave}</h3>
                    )}</div>
                </div>
                <div className="bg-white">
                  <div className="m-5">
                    <h5>Yearly</h5>
                    {output &&(
                    <h3 className="text-lg font-semibold pt-3">${output.yearlySave}</h3>
                    )}</div>
                </div>
                <div className="bg-white">
                  <div className="m-5">
                    <h5>Over loan life</h5>
                    {output &&(
                    <h3 className="text-lg font-semibold pt-3">${output.lifeSave}</h3>)}</div>
                </div>
              </div>
            </div>
          </div>)}
          
          {paymentType === "interest" && output && (
            <div className="mt-10 m-8">
              <div>
                <div>
                  <h4 className="md:text-2xl text-lg font-normal">Your new monthly Interest Only repayments</h4>
                    <h5 className="md:text-3xl text-xl font-bold">${output.newRepayment}</h5>
                </div>
                <div className="grid grid-cols-2 mt-5 gap-5">
                  <div>
                    <h4 className="md:text-2xl text-lg font-normal">Interest rate</h4>
                    <h5 className="md:text-3xl text-xl font-bold">{output.rate}%</h5>
                  </div>
                  <div>
                    <h4 className="md:text-2xl text-lg font-normal">Comparison rate**</h4>
                    <h5 className="md:text-3xl text-xl font-bold">{output.compRate}%</h5>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="border-b text-sm md:text-lg border-dashed hover:text-blue-800">Monthly Principal & Interest Repayments after Interest Only</button>
                  <h5 className="md:text-2xl text-lgfont-bold ">${output.currentRepayment}</h5>
                </div>
                <div className="mt-5">
                  <h4>Our estimate of your current Principal and Interest monthly repayments</h4>
                  <h5 className="md:text-2xl text-lg font-bold">${output.currentRepayment}</h5>
                </div>

              </div>
            </div>)}

        
        </section>

      </main>
    </div>

  );

}