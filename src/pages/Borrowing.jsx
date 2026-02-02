import { useState } from "react";
import CalculatorTabs from "../CalculatorTabs";

export default function Borrowing() {

    const [showRentalIncome, setShowRentalIncome] = useState(false);
    const [showOtherIncome, setShowOtherIncome] = useState(false);
    const [showRentPaying, setShowRentPaying] = useState(false);

    function handleSubmit(){

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
       
                
               
                      
                <main className="grid grid-cols-2">
                    <section className="md:m-5 m-3 bg-gray-300">
                <div className="bg-white shadow-md rounded md:p-6 p-3">
                    <div className="bg-white md:p-6 p:3">
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
                
                <div>
                    <h3 className="text-lg font-semibold mb-3">I'm looking for</h3>
                    <select className="w-full border p-3 rounded">
                        <option>a home to live in</option>
                        <option>an investment property</option>
                    </select>
                </div>
                
                </div>
                <hr/>
                



                <div className="mt-3 m-3 md:m-5">
                    <h2 className="text-2xl font-semibold mb-6">My Income</h2>
                    <h3 className="text-lg font-semibold mb-3">I earn (before tax)</h3>
                    <div className="flex gap-4">

                        <input type="number" defaultValue={150000} className="w-full border p-3 rounded" />

                        <select className="border p-3 rounded">
                            <option>per year</option>
                            <option>per month</option>
                            <option>per fortnight</option>
                            <option>per week</option>
                        </select>
                    </div>
                    <div className="m-3 mt-2 ">

                        <button onclick={() => showRentalIncome(true)} className="text-blue-600 text-sm">+ I receive rental income</button></div>
                    <span>income can receive from an inverstment property</span>

                    {showRentalIncome && (
                        <div className="flex gap-4 ">
                            <label className="text-lg font-semibold mb-3">Current rental income</label>
                            <input type="number" placeholder="0" className="w-full border p-3 rounded" />
                            <select className="border p-3 rounded">
                                <option>Per month</option>
                                <option>Per year</option>
                                <option>per fortnight</option>
                                <option>per week</option>
                            </select>
                        </div>
                    )}
                    
                    <div className=" mt-2 mb-5">
                        <div className=" m-3 ">

                        <button onClick={() => showOtherIncome(true)} className="text-blue-600 text-sm">+ I earn other income</button> </div>
                        <span>(E.g. regular bonus, overtime, dividends)</span>
                        
                        

                        {showOtherIncome && (
                            <div className="flex gap-4">
                                <label className="text-lg font-semibold mb-3">My other income</label>
                                <input type="number" placeholder="0" className="w-full border p-3 rounded" />
                                <select className="border p-3 rounded">
                                    <option>Per year</option>
                                    <option>Per month</option>
                                    <option>per fortnight</option>
                                    <option>per week</option>
                                </select>
                            </div>
                        )}
                    </div>
                    </div>
                    <hr></hr>
                

                

                <div className="mt-5 m-3 md:m-5">
                    <h2 className="text-2xl font-semibold mb-6">Expenses</h2>
                    <div>
                        
                    <h5 className="text-lg font-semibold mb-3">Bills and living expenses</h5>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="0" className="w-full border p-3 rounded" />

                        <select className="border p-3 rounded">
                            <option>per year</option>
                            <option>per month</option>
                            <option>per fortnight</option>
                            <option>per week</option>
                        </select>
                    </div>
                    

                    <p className="mt-3">(E.g. food, electricity, transport, education, entertainment)</p>
                    </div>
                    <div>
                        <div className="m-3 mt-5">
                        <button onClick={() => showRentPaying(true)}  className="text-blue-600 text-sm">+ I’ll be paying rent after I buy a property
                        </button></div>
                        <span>(If you’ll pay rent once you buy a property)</span>

                        {showRentPaying && (
                            <div className="flex gap-4">
                                <label className="text-lg font-semibold mb-3">Rent I’ll be paying</label>
                                <input type="number" placeholder="0" className="w-full border p-3 rounded" />
                                <select className="border p-3 rounded">
                                    <option>Per month</option>
                                    <option>Per year</option>
                                    <option>per fortnight</option>
                                    <option>per week</option>
                                </select>
                            </div>
                        )}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-3 mt-5">Current loan repayments</h4>
                            <div className="grid grid-cols-2 gap-3">

                                <input type="number" placeholder="0" className="w-full border p-3 rounded" />

                                <select className="border p-3 rounded">
                                    <option>per year</option>
                                    <option>per month</option>
                                    <option>per fortnight</option>
                                    <option>per week</option>
                                </select>
                                </div>
                                <p className="mt-3">(If you already have a home loan)</p>
                            
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-3 mt-5">Other loan repayments</h4>
                            <div className="grid grid-cols-2 gap-3">

                                <input type="number" placeholder="0" className="w-full border p-3 rounded" />

                                <select className="border p-3 rounded">
                                    <option>per year</option>
                                    <option>per month</option>
                                    <option>per fortnight</option>
                                    <option>per week</option>
                                </select>
                                </div>
                                <p className="mt-3">(Total repayments e.g. personal, student, car loan)</p>
                            



                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-3 mt-5">Total credit card limit</h4>


                            <input type="tel" placeholder="0" className="w-full border p-3 rounded" />


                            <p className="mt-3">(Combined limits including store cards)</p>




                        </div>
                        <div className="mt-5 mx-auto justify-center content-center">
                            <button
                                type="submit"
                                onclick={handleSubmit}
                                className="border-2 bg-Amber-400 rounded-xl justify-center text-center px-4 py-2">
                                    calculate
                                </button>
                        </div>
                       
                    </div>
                    </div>
                    </section>
                    <section className="bg-black m-5">
                        <div className="text-white">
                            <h className="text-2xl font-semibold "> You may be able to borrow up to</h>
                            <p className="text-gray-500 text-4xl font-bold">$</p>
                        </div>

                    </section>
                    </main>
                
            </div>

           

            </div>
            
    )
}





