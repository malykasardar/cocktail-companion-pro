
import React, { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const DrinkWise = () => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateBAC = () => {
    const numDrinks = parseFloat(drinks);
    const bodyWeight = parseFloat(weight);
    const timeSpent = parseFloat(time);

    if (!numDrinks || !bodyWeight || !timeSpent) {
      setResult('Please fill in all fields');
      return;
    }

    // Simplified BAC calculation (for demonstration purposes)
    // Real BAC calculation would be more complex
    const alcoholGrams = numDrinks * 14; // 14g alcohol per standard drink
    const bodyWaterPercent = 0.68; // Average body water percentage
    const bodyWaterWeight = bodyWeight * bodyWaterPercent * 453.592; // Convert lbs to grams
    const bac = (alcoholGrams / bodyWaterWeight) * 100;
    const bacAfterTime = Math.max(0, bac - (timeSpent * 0.015)); // Alcohol metabolizes at ~0.015% per hour

    let advice = '';
    if (bacAfterTime >= 0.08) {
      advice = 'You are legally intoxicated. Do not drive. Consider calling a ride service and drinking water.';
    } else if (bacAfterTime >= 0.05) {
      advice = 'You may be impaired. Avoid driving and consider having a non-alcoholic beverage.';
    } else if (bacAfterTime > 0) {
      advice = 'You may still have alcohol in your system. Stay hydrated and be cautious.';
    } else {
      advice = 'You should be sober, but always drink responsibly and stay hydrated.';
    }

    setResult(`Estimated BAC: ${bacAfterTime.toFixed(3)}%. ${advice}`);
  };

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">DrinkWise</h1>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-lg text-foreground mb-2">Input your drinks</p>
          <p className="text-muted-foreground">
            Get personalized advice based on your consumption
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-6 mb-8">
          <div>
            <input
              type="number"
              placeholder="Number of drinks"
              value={drinks}
              onChange={(e) => setDrinks(e.target.value)}
              className="w-full bartender-input"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Body weight (lbs)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bartender-input"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Time spent drinking (hours)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bartender-input"
            />
          </div>

          <button 
            onClick={calculateBAC}
            className="w-full bartender-button flex items-center justify-center space-x-2"
          >
            <Calculator size={20} />
            <span>Calculate</span>
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bartender-card animate-fade-in">
            <p className="text-foreground leading-relaxed">{result}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-bartender-surface-light rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This calculator provides estimates only and should not be used to determine fitness to drive or operate machinery. Always drink responsibly and never drink and drive.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DrinkWise;
