import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import CalculatorTabs from "../CalculatorTabs";
import { useEffect, useState } from "react";

export default function Stamp() {
  const [isVisible, setIsVisible] = useState(false);
  const [output, setOutput] = useState(null);
  const [initialState, SetInitialState] = useState({
    savings: 0,
    propertyWorth: 0,
    lookingFor: '',
    location: '',
    purpose: '',
  })
  const savingsData = [
    { name: "Savings", value: output?.savings || 0 },
    { value: 0 }
  ];

  const upfrontData = [
    { name: "Upfront", value: output?.upfrontCosts || 0 },
    { value: (output?.savings || 0) - (output?.upfrontCosts || 0) }
  ];

  const leftData = [
    { name: "Left", value: output?.savingsLeft || 0 },
    { value: (output?.savings || 0) - (output?.savingsLeft || 0) }
  ];

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    SetInitialState(prev => ({ ...prev, [name]: value }))
  }

useEffect(() => {
    const savings = Number(initialState.savings);
    const propertyWorth = Number(initialState.propertyWorth);
    const baseCost = Number(initialState.lookingFor);
    const stampRate = Number(initialState.location);
    const multiplier = Number(initialState.purpose);

    // Only show results if the user has started entering data
    if (propertyWorth > 0 || savings > 0) {
      const stampDuty = propertyWorth * stampRate;
      const upfrontCosts = Math.round((baseCost + stampDuty) * multiplier);
      const savingsLeft = savings - upfrontCosts;

      setOutput({
        savings,
        upfrontCosts,
        savingsLeft,
      });
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [initialState]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Stamp Duty Calculator</h1>
        <p className="text-gray-600 mb-8">
          In addition to your deposit, there are some other upfront costs like stamp duty and conveyancing to budget for. Stamp duty (or transfer duty) is a tax levy that needs to be paid when you purchase a property or transfer ownership of a property within Australia.
        </p>
        <CalculatorTabs />
        <form>
          <div className="mt-10 bg-white shadow-md p-6 rounded">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  I'm looking for
                </label>
                <select className="w-full border p-2 rounded"
                  name="lookingFor"
                  onChange={handleChange}>
                  <option value="2000">an existing property</option>
                  <option value="3000">a newly built property</option>
                  <option value="1500">vacant land to build on</option>
                </select>

              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  in
                </label>
                <select className="w-1/2 border p-2 rounded"
                  name="location"
                  onChange={handleChange}>
                  <option value="0.04">NSW</option>
                  <option value="0.05"> VIC</option>
                  <option value="0.035">QLD</option>
                  <option value="0.04">WA</option>
                  <option value="0.045">SA</option>
                  <option value="0.03">TAS</option>
                  <option value="0.025">ACT</option>
                  <option value="0.042">NT</option>
                </select>

              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  for
                </label>
                <select className="w-full border p-2 rounded"
                  name="purpose"
                  onChange={handleChange}>
                  <option value="0.5">my first home</option>
                  <option value="1">a home to live</option>
                  <option value="1.2">an investment property</option>
                </select>

              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  I have savings for
                </label>

                <input
                  name="savings"
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="w-full border p-2 rounded"
                />

              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  for a property worth
                </label>

                <input
                  name="propertyWorth"
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="w-full border p-2 rounded"
                />

              </div>
            </div>
          
          </div>
        </form>
        {isVisible &&

          <div>
            {output &&
              <h3 className="text-4xl font-light justify-center text-center m-5 mt-5">Your upfront costs would be ${output.upfrontCosts}</h3>}
            

<div className="w-full max-w-5xl mx-auto">
  <div className="grid grid-cols-3 sm:grid-cols-5 items-center">

    <div className="h-[160px] sm:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={savingsData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="75%"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill="#9ca3af" />
            <Cell fill="#e5e7eb" />
          </Pie>

          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan fontSize={18} fontWeight="600">
              ${output?.savings?.toLocaleString() || 0}
            </tspan>
            <tspan x="50%" dy="20" fontSize={12} fill="#6b7280">
              Savings
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>

 
    <div className="flex justify-center">
      <img src="src/assets/minus.png" className="w-6 h-6 sm:w-10 sm:h-10" />
    </div>

    <div className="h-[160px] sm:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={upfrontData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="75%"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill="#fad21f" />
            <Cell fill="#e5e7eb" />
          </Pie>

          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan fontSize={18} fontWeight="600">
              ${output?.upfrontCosts?.toLocaleString() || 0}
            </tspan>
            <tspan x="50%" dy="20" fontSize={12} fill="#6b7280">
              Upfront costs
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="flex justify-center">
      <img src="src/assets/equaltojpg.jpg" className="w-6 h-6 sm:w-10 sm:h-10" />
    </div>

    <div className="h-[160px] sm:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={leftData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="75%"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill="#179bc4" />
            <Cell fill="#e5e7eb" />
          </Pie>

          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan fontSize={18} fontWeight="600">
              ${output?.savingsLeft?.toLocaleString() || 0}
            </tspan>
            <tspan x="50%" dy="20" fontSize={12} fill="#6b7280">
              Savings left
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>


            <div>
              {output &&
                <h5 className="md:text-lg text-xl font-light m-3 ">After covering your upfront costs, you’d have ${output.savingsLeft} savings remaining for a deposit.</h5>
              }

            </div>

          </div>
        }


      </div>


    </div>

  );
}