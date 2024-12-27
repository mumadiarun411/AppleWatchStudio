import React, { useState } from 'react';
import './App.css'; // Assuming TailwindCSS or custom CSS is being used

const App = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);
  const [collection, setCollection] = useState('Series 10');
  const [savedConfiguration, setSavedConfiguration] = useState(null);

  const cases = [
    { id: 1, material: 'Aluminum', image: '../assets/image(2).png', price: 399 },
    { id: 2, material: 'Titanium', image: '../assets/image (3).png', price: 799 },
  ];

  const sizes = [
    { id: 1, size: '42mm', priceModifier: 0 },
    { id: 2, size: '46mm', priceModifier: 50 },
  ];

  const bands = [
    { id: 1, type: 'Solo Loop', color: 'Red', image: '../assets/image (6).png', price: 49 },
    { id: 2, type: 'Braided Loop', color: 'Blue', image: '../assets/image (7).png', price: 99 },
  ];

  const collections = ['Series 10', 'Hermès', 'SE'];

  const calculateTotalPrice = () => {
    const casePrice = selectedCase ? selectedCase.price : 0;
    const sizeModifier = selectedSize ? selectedSize.priceModifier : 0;
    const bandPrice = selectedBand ? selectedBand.price : 0;
    return casePrice + sizeModifier + bandPrice;
  };

  const handleSaveConfiguration = () => {
    const config = {
      case: selectedCase,
      size: selectedSize,
      band: selectedBand,
      collection,
      totalPrice: calculateTotalPrice(),
    };
    localStorage.setItem('watchConfiguration', JSON.stringify(config));
    setSavedConfiguration(config);
    alert('Configuration saved!');
  };

  return (
    <div className="app-container font-sans">
      {/* Collection Selector */}
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Apple Watch Studio</h1>
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          {collections.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </header>

      <main className="p-4 grid md:grid-cols-2 gap-6">
        {/* Watch Preview */}
        <div className="preview-container border p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Your Watch Preview</h2>
          {selectedCase && selectedSize && selectedBand ? (
            <div className="relative">
              <img src={selectedCase.image} alt={selectedCase.material} />
              <img
                src={selectedBand.image}
                alt={`${selectedBand.type} ${selectedBand.color}`}
                className="absolute inset-0"
              />
            </div>
          ) : (
            <p className="text-gray-500">Select options to preview your watch</p>
          )}
        </div>

        {/* Customization Options */}
        <div className="options-container">
          {/* Case Selection */}
          <section>
            <h3 className="text-lg font-medium mb-2">Case Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`border p-2 rounded ${selectedCase?.id === c.id ? 'border-blue-500' : ''}`}
                >
                  <img src={c.image} alt={c.material} className="mb-2" />
                  <p>{c.material}</p>
                  <p>${c.price}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Size Selection */}
          <section className="mt-4">
            <h3 className="text-lg font-medium mb-2">Size Selection</h3>
            <div className="flex gap-4">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s)}
                  className={`border p-2 rounded ${selectedSize?.id === s.id ? 'border-blue-500' : ''}`}
                >
                  <p>{s.size}</p>
                  <p>{s.priceModifier > 0 ? `+${s.priceModifier}` : 'Included'}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Band Selection */}
          <section className="mt-4">
            <h3 className="text-lg font-medium mb-2">Band Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {bands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBand(b)}
                  className={`border p-2 rounded ${selectedBand?.id === b.id ? 'border-blue-500' : ''}`}
                >
                  <img src={b.image} alt={`${b.type} ${b.color}`} className="mb-2" />
                  <p>{b.type}</p>
                  <p>{b.color}</p>
                  <p>${b.price}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Total Price */}
          <section className="mt-4">
            <h3 className="text-lg font-medium">Total Price</h3>
            <p className="text-xl font-bold">${calculateTotalPrice()}</p>
          </section>
        </div>
      </main>

      <footer className="p-4 text-center border-t">
        <button
          onClick={handleSaveConfiguration}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Save Configuration
        </button>

        {savedConfiguration && (
          <div className="mt-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-4">Saved Configuration</h3>
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Option</th>
                  <th className="border p-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Collection</td>
                  <td className="border p-2">{savedConfiguration.collection}</td>
                </tr>
                <tr>
                  <td className="border p-2">Case</td>
                  <td className="border p-2">{savedConfiguration.case?.material} - ${savedConfiguration.case?.price}</td>
                </tr>
                <tr>
                  <td className="border p-2">Size</td>
                  <td className="border p-2">{savedConfiguration.size?.size} - {savedConfiguration.size?.priceModifier > 0 ? `+${savedConfiguration.size.priceModifier}` : 'Included'}</td>
                </tr>
                <tr>
                  <td className="border p-2">Band</td>
                  <td className="border p-2">{savedConfiguration.band?.type} ({savedConfiguration.band?.color}) - ${savedConfiguration.band?.price}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Total Price</td>
                  <td className="border p-2 font-bold">${savedConfiguration.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
