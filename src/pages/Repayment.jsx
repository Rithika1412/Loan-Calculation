import { useState } from "react";
import CalculatorTabs from "../CalculatorTabs";
import { useEffect } from 'react';

export default function Repayment() {
    const [showInterestRate, setShowInterestRate] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [initialState, setInitialState] = useState({
        loanAmount: 0,
        term: 0,
        repaymentType: '',
        principleAndInterestType: '',
        interestRate: 0,
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInitialState(values => ({ ...values, [name]: value }))
    }

    console.log(initialState, 'initialState');
    const [output, setOutput] = useState(null);

    function getInterestOnlyYears(type) {
        if (type.startsWith("io-")) {
            return Number(type.split("-")[1]);
        }
        return 0;
    }






    useEffect(() => {
        const loanAmount = Number(initialState.loanAmount);
        const termYears = Number(initialState.term);

        const interestRate = showInterestRate
            ? Number(initialState.interestRate)
            : Number(initialState.principleAndInterestType);

        if (loanAmount > 0 && termYears > 0 && interestRate > 0) {
            const monthlyRate = interestRate / 100 / 12;
            const totalMonths = termYears * 12;

            const interestOnlyYears = getInterestOnlyYears(initialState.repaymentType);
            const interestOnlyMonths = interestOnlyYears * 12;
            const remainingMonths = totalMonths - interestOnlyMonths;


            const interestOnlyMonthly = loanAmount * monthlyRate;

            let principleAndInterestMonthly = 0;
            if (remainingMonths > 0) {
                const commonFactor = Math.pow(1 + monthlyRate, remainingMonths);
                principleAndInterestMonthly = (loanAmount * monthlyRate * commonFactor) / (commonFactor - 1);
            } else {

                principleAndInterestMonthly = 0;
            }


            const totalLoanRepayment = (interestOnlyMonthly * interestOnlyMonths) + (principleAndInterestMonthly * remainingMonths);
            const totalInterestCharged = totalLoanRepayment - loanAmount;

            setOutput({
                interestOnlyMonthly: Number(interestOnlyMonthly.toFixed(2)),
                principleAndInterestMonthly: Number(principleAndInterestMonthly.toFixed(0)),
                variableRate: Number(interestRate.toFixed(2)),
                comparisonRate: Number((interestRate + 0.26).toFixed(2)), // Standard estimation
                totalLoanRepayment: Number(totalLoanRepayment.toFixed(0)),
                totalInterestCharged: Number(totalInterestCharged.toFixed(0)),
            });

            setIsVisible(true);
        } else {

            setIsVisible(false);
        }

    }, [initialState, showInterestRate]);


    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div >


                <h1 className="text-4xl font-bold mb-4">
                    Mortgage Repayment Calculator
                </h1>

                <p className="text-gray-600 mb-8">
                    Work out how much your home loan repayments might be. Easily adjust
                    your loan amount, mortgage repayment type and interest rate.
                </p>

                <CalculatorTabs />
                <form>
                    <div className="mt-10 bg-white shadow-md p-6 rounded">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">
                                    Loan Amount
                                </label>

                                <input
                                    name="loanAmount"

                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0"
                                    className="w-full border p-2 rounded"
                                />

                            </div>


                            <div>
                                <label className="block text-sm text-gray-500 mb-1">
                                    Term
                                </label>
                                <div className="flex">
                                    <div className="flex items-center border rounded px-2">
                                        <input
                                            name="term"
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="0"
                                            className="w-full p-2 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-gray-500 ml-2">years</span>
                                    </div>
                                </div>

                            </div>


                            <div>
                                <label className="block text-sm text-gray-500 mb-1">
                                    Repayment type
                                </label>
                                <select className="w-full border p-2 rounded"
                                    value={initialState.repaymentType}
                                    onChange={handleChange} name="repaymentType">
                                    <option value="pi">Principal and interest</option>
                                    <option value="io-1">Interest only 1 year</option>
                                    <option value="io-2">Interest only 2 year</option>
                                    <option value="io-3">Interest only 3 year</option>
                                    <option value="io-4">Interest only 4 year</option>
                                    <option value="io-5">Interest only 5 year</option>
                                </select>
                            </div>


                            {!showInterestRate ? (
                                <div className="flex">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            With a
                                        </label>
                                        <select className="w-full border p-2 rounded mb-2"
                                            vlaue={initialState.principleAndInterestType}
                                            onChange={handleChange}
                                            name="principleAndInterestType">

                                            {initialState.repaymentType === 'pi' ? (
                                                <>
                                                    <option value="5.59">5.59% p.a. Simple Home Loan - Variable Rate LVR 60% or below</option>
                                                    <option value="5.64">5.64% p.a. Simple Home Loan - Variable Rate LVR 60.01% to 70%</option>
                                                    <option value="5.74">5.74% p.a. Simple Home Loan - Variable Rate LVR 70.01% to 80%</option>
                                                    <option value="6.04">6.04% p.a. Simple Home Loan - Variable Rate LVR 80.01% to 90%</option>
                                                    <option value="6.99">6.99% p.a. Simple Home Loan - Variable Rate LVR 90.01% to 95%</option>
                                                    <option value="8.05">8.05% p.a. Standard Variable Rate Home Loan LVR 60% or below</option>
                                                    <option value="6.09">6.09% p.a. 1 Year Fixed Rate Home Loan</option>
                                                    <option value="5.94">5.94% p.a. 2 Year Fixed Rate Home Loan</option>
                                                    <option value="6.19">6.19% p.a. 3 Year Fixed Rate Home Loan</option>
                                                    <option value="6.24">6.24% p.a. 4 Year Fixed Rate Home Loan</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="6.08">6.08% p.a. Simple Home Loan - Variable Rate LVR 60% or below</option>
                                                    <option value="6.13">6.13% pia. Simple Home Loan - Variable Rate LVR 60.01% to 70%</option>
                                                    <option value="6.23">6.23% p.a. Simple Home Loan - Variable Rate LVR 70.01% to 80%</option>
                                                    <option value="8.54">8.54% p.a. Standard Variable Rate Home Loan LVR 60% or below</option>
                                                    <option value="8.54">8.54% pa Standard Variable Rate Home Loan LVR 60.01% to 70%</option>
                                                    <option value="8.54">8.54% p.a. Standard Variable Rate Home Loan LVFR 70.01% to 80%</option>
                                                    <option value="6.49">6.49% p.a. 1 Year Fixed Rate Home Loan</option>
                                                    <option value="6.34">6.34% p.a. 2 Year Fixed Rate Home Loan</option>
                                                    <option value="6.64">6.64% p.a. 3 Year Fixed Rate Home Loan</option>
                                                    <option value="6.69">6.69% p.a. 4 Year Fixed Rate Home Loan</option>
                                                    <option value="6.79">6.79% pa: 5 Year Fixed Rate Home Loan</option>

                                                </>
                                            )}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => setShowInterestRate(true)}
                                        className="text-blue-600 text-sm underline"
                                    >
                                        input interest rate
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">
                                        with an interest of
                                    </label>
                                    <div className="flex items-center border rounded px-2 mb-2">
                                        <input
                                            name="interestRate"
                                            onChange={handleChange}
                                            type="number"
                                            step="any"
                                            placeholder="0"
                                            className="w-full p-2 outline-none" />
                                        <span className="text-gray-500">%p.a</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-400">or</span>
                                        <button
                                            onClick={() => setShowInterestRate(false)}
                                            className="text-blue-600 underline"
                                        >
                                            choose a home loan
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </form>
            </div>
            {isVisible &&
                <div>


                    <h4 className="text-3xl font-semibold m-5">Your Monthly repayments</h4>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 ">
                            <div>
                                <h4 className="text-lg font-semibold m-3">Principals and interest repayments</h4>
                                {output && (
                                    <h1 className="text-2xl font-bold m-4 ml-3">${output.principleAndInterestMonthly}</h1>)}

                            </div>

                            <div>
                                <h4 className="text-lg font-semibold m-3">Variable Rate</h4>
                                <div className="flex gap-5">
                                    {output && (
                                        <h1 className="text-2xl font-bold ml-3">{output.variableRate}</h1>)}
                                    <span>%p.a</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold m-3">Comparison Rate</h4>
                                <div className="flex gap-5">
                                    {output && (
                                        <h1 className="text-2xl font-bold ml-3">{output.comparisonRate}</h1>)}
                                    <span>%p.a</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-20">
                            <div>
                                <h4 className="text-lg font-semibold m-3">Total Loan Repayments</h4>
                                {output && (
                                    <h1 className="text-2xl font-bold ml-3">{output.totalLoanRepayment}</h1>)}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold m-3">Total interest Changed</h4>
                                {output && (
                                    <h1 className="text-2xl font-bold ml-3">{output.totalInterestCharged}</h1>)}
                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-30 mt-5">
                            <div>
                                <label className="block text-sm text-gray-500 mb-3">Repayment frequency</label>
                                <select className="w-full border p-2 rounded mb-2" >
                                    <option>Monthly</option>
                                    <option>Fortnightly</option>
                                    <option>Weekly</option></select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-3">Additional Repayments</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full border p-2 rounded" />
                            </div>
                        </div>
                    </div>



                </div>
            }
        </div>
    );
}