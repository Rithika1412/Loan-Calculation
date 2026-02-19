import CalculatorTabs from "../CalculatorTabs";
import { useState } from "react";

export default function Borrowing() {
    const [showRentalIncome, setShowRentalIncome] = useState(false);
    const [showOtherIncome, setShowOtherIncome] = useState(false);
    const [showRentPaying, setShowRentPaying] = useState(false);

    const [borrowingPower, setBorrowingPower] = useState('');

    const [initialState, setInitialState] = useState({
        earning: "",
        earningUnit: "per year",

        rentalIncome: "",
        rentalUnit: "per year",

        otherIncome: "",
        otherIncomeUnit: "per year",

        living: "",
        livingUnit: "per year",

        rent: "",
        rentUnit: "per year",

        currentLoan: "",
        currentLoanUnit: "per year",

        otherLoan: "",
        otherLoanUnit: "per year",

        creditCard: "",
    });


    function handleChange(e) {
        const { name, value } = e.target;
        setInitialState(prev => ({ ...prev, [name]: value, }));
    }

    function toAnnual(value, unit) {
        const val = Number(value) || 0;

        switch ((unit || "").toLowerCase()) {
            case "per month":
                return val * 12;
            case "per fortnight":
                return val * 26;
            case "per week":
                return val * 52;
            case "per year":
            default:
                return val;
        }
    }



    function handleSubmit(e) {
        e.preventDefault();

        const earningAnnual = toAnnual(initialState.earning, initialState.earningUnit);

        const rentalAnnual = toAnnual(initialState.rentalIncome, initialState.rentalUnit) * 0.8;

        const otherAnnual = toAnnual(initialState.otherIncome, initialState.otherIncomeUnit);

        const livingAnnual = toAnnual(initialState.living, initialState.livingUnit);

        const rentAnnual = toAnnual(initialState.rent, initialState.rentUnit);

        const currentLoanAnnual = toAnnual(initialState.currentLoan, initialState.currentLoanUnit);

        const otherLoanAnnual = toAnnual(initialState.otherLoan, initialState.otherLoanUnit);

        const totalIncome = earningAnnual + rentalAnnual + otherAnnual;

        const creditCardAnnual =
            (Number(initialState.creditCard) || 0) * 0.03 * 12;

        const totalExpenses = livingAnnual + rentAnnual + currentLoanAnnual + otherLoanAnnual + creditCardAnnual;


        const annualSurplus = totalIncome - totalExpenses;


        if (annualSurplus <= 0) {
            setBorrowingPower(0);
            return;
        }

        const interestRate = 0.06;
        const years = 30;
        const monthlyRate = interestRate / 12;
        const months = years * 12;
        const monthlySurplus = annualSurplus / 12;

        const borrowAmount =
            (monthlySurplus * (Math.pow(1 + monthlyRate, months) - 1)) /
            (monthlyRate * Math.pow(1 + monthlyRate, months));



        setBorrowingPower(Math.round(borrowAmount));
    }




    return (

        <div className="max-w-6xl mx-auto px-6 py-10">
            <div >


                <h1 className="text-4xl font-bold mb-4">
                    Borrowing Power Calculator
                </h1>

                <p className="text-gray-600 mb-8">
                    Enter your income and expenses to estimate how much you may be able to borrow for a home loan.
                </p>

                <CalculatorTabs />




                <main className="grid md:grid-cols-2 grid-cols-1">
                    <section className="md:m-5 m-3 bg-gray-300">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white shadow-md rounded md:p-6 p-3">
                                <div className="bg-white md:p-6 p-3">
                                    <h2 className="text-2xl font-semibold mb-6">About me</h2>
                                    <div className="mb-6">
                                        <label className="block text-sm text-gray-500 mb-1">This lone is for</label>
                                        <select className="w-full border p-3 rounded">
                                            <option>It's just me</option>
                                            <option>There's two of us</option>
                                        </select>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3">Number of Dependants</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>

                                            <select className="w-full border p-3 rounded">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>

                                            </select>
                                            <p className="text-sm text-gray-500 mt-1">
                                                children (under 18)
                                            </p>
                                        </div>
                                        <div>

                                            <select className="w-full border p-3 rounded">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                            <p className="text-sm text-gray-500 mt-1">
                                                adults (18 and over)
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mb-10">
                                        <h3 className="text-lg font-semibold mb-3">I'm looking for</h3>
                                        <select className="w-full border p-3 rounded">
                                            <option>a home to live in</option>
                                            <option>an investment property</option>
                                        </select>
                                    </div>

                                </div>
                                <hr />




                                <div className="mt-3 m-3 md:m-5">
                                    <h2 className="text-2xl font-semibold mb-6">My Income</h2>
                                    <h3 className="text-lg font-semibold mb-3">I earn (before tax)</h3>
                                    <div className="flex gap-4">

                                        <input type="number" placeholder="0" className="w-full border p-3 rounded"
                                            name="earning"
                                            value={initialState.earning}
                                            onChange={handleChange} />

                                        <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                    </div>


                                    {!showRentalIncome && (
                                        <div className="m-3 mt-2">
                                            <button
                                                onClick={() => setShowRentalIncome(true)}
                                                className="text-blue-600 text-sm"
                                            >
                                                + I receive rental income
                                            </button>
                                        </div>
                                    )}


                                    {showRentalIncome && (
                                        <div className="mt-5">
                                            <label className="text-lg font-semibold mb-3">
                                                Current rental income
                                            </label>
                                            <div className="flex gap-3">

                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full border p-3 rounded"
                                                    name="rentalIncome"
                                                    value={initialState.rentalIncome}
                                                    onChange={handleChange}
                                                />

                                               <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                            </div>
                                        </div>
                                    )}

                                    <span>income can receive from an inverstment property</span>
                                    {!showOtherIncome && (

                                        <div className=" m-3 mt-2">

                                            <button onClick={() => setShowOtherIncome(true)}
                                                className="text-blue-600 text-sm">
                                                + I earn other income</button>
                                        </div>
                                    )}



                                    {showOtherIncome && (
                                        <div className="mt-5">
                                            <label className="text-lg font-semibold mb-3">My other income</label>
                                            <div className="flex gap-3">
                                                <input type="number" placeholder="0" className="w-full border p-3 rounded"
                                                    name="otherIncome"
                                                    value={initialState.otherIncome}
                                                    onChange={handleChange} />
                                               <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                            </div>
                                        </div>
                                    )}

                                    <span>(E.g. regular bonus, overtime, dividends)</span>
                                </div>
                                <hr></hr>




                                <div className="mt-5 m-3 md:m-5">
                                    <h2 className="text-2xl font-semibold mb-6">Expenses</h2>
                                    <div>

                                        <h5 className="text-lg font-semibold mb-3">Bills and living expenses</h5>
                                        <div className="flex gap-3 mt-3">
                                            <input type="number" placeholder="0" className="w-full border p-3 rounded" name="living"
                                                value={initialState.living}
                                                onChange={handleChange} />

                                           <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                        </div>


                                        <p className="mt-3">(E.g. food, electricity, transport, education, entertainment)</p>
                                    </div>
                                    <div>
                                        {!showRentPaying && (
                                            <div className="m-3 mt-5">
                                                <button
                                                    onClick={() => setShowRentPaying(true)}
                                                    className="text-blue-600 text-sm">+ I’ll be paying rent after I buy a property
                                                </button>
                                            </div>)}


                                        {showRentPaying && (
                                            <div className="mt-3">
                                                <label className="text-lg font-semibold mb-3">Rent I’ll be paying</label>
                                                <div className="flex gap-3 mt-5 mb-2">
                                                    <input type="number" placeholder="0" className="w-full border p-3 rounded" name="rent"
                                                        value={initialState.rent}
                                                        onChange={handleChange} />
                                                    <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <span>(If you’ll pay rent once you buy a property)</span>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 mt-5">Current loan repayments</h4>
                                        <div className="flex gap-3">

                                            <input type="number" placeholder="0" className="w-full border p-3 rounded" name="currentLoan"
                                                value={initialState.currentLoan}
                                                onChange={handleChange} />

                                            <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                        </div>
                                        <p className="mt-3">(If you already have a home loan)</p>

                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 mt-5">Other loan repayments</h4>
                                        <div className="flex gap-3 mt-3">

                                            <input type="number" placeholder="0" className="w-full border p-3 rounded" name="otherLoan"
                                                value={initialState.otherLoan}
                                                onChange={handleChange} />

                                            <select className=" p-3 rounded "
                                            name="earningUnit"
                                            value={initialState.earningUnit}
                                            onChange={handleChange}>
                                            <option value="Per year">Per year</option>
                                            <option value="Per month">Per month</option>
                                            <option value="Per fortnight">Per fortnight</option>
                                            <option value="Per week">Per week</option>
                                        </select>
                                        </div>
                                        <p className="mt-3">(Total repayments e.g. personal, student, car loan)</p>




                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 mt-5">Total credit card limit</h4>


                                        <input type="tel" placeholder="0" className="w-full border p-3 rounded" name="creditCard"
                                            value={initialState.creditCard}
                                            onChange={handleChange} />


                                        <p className="mt-3">(Combined limits including store cards)</p>




                                    </div>
                                    <div className="mt-5 mx-auto justify-center content-center">
                                        <button
                                            type="submit"

                                            className=" bg-amber-400 text-black font-semibold rounded-xl justify-center text-center px-6 py-2">
                                            Calculate
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </section>
                    <section className="bg-black m-5">
                        <div className="text-white m-5">
                            <h3 className="text-2xl font-semibold m-2"> You may be able to borrow up to</h3>

                            <p className="text-gray-500 text-4xl font-bold m-2">${borrowingPower.toLocaleString()}</p>
                        </div>

                    </section>
                </main>

            </div>



        </div>

    )
}





