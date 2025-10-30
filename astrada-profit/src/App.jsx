import { useState } from "react";

export default function App() {
  const [input, setInput] = useState({
    hpp: 0,
    markup: 0,
    hargaJual: 0,
    diskon: 0,
    biayaAdmin: 0,
    biayaIklan: 0,
  });

  const formatNumber = (val) => {
    return Number(val).toLocaleString("id-ID");
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: Number(e.target.value) });
  };

  // Rumus sesuai Excel
  const hargaSetelahDiskon = input.hargaJual - input.diskon;
  const grossProfit = hargaSetelahDiskon - input.hpp;
  const netProfit = grossProfit - input.biayaAdmin - input.biayaIklan;
  const margin = input.hpp !== 0 ? (grossProfit / input.hpp) * 100 : 0;
  const markupPrice = input.hpp * (1 + input.markup / 100);
  const roas = input.biayaIklan !== 0 ? (hargaSetelahDiskon / input.biayaIklan) * 100 : 0;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Kalkulator Profit Marketplace
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="number" name="hpp" placeholder="HPP" className="border p-2 rounded" onChange={handleChange} />
          <input type="number" name="markup" placeholder="Markup %" className="border p-2 rounded" onChange={handleChange} />
          <input type="number" name="hargaJual" placeholder="Harga Jual" className="border p-2 rounded" onChange={handleChange} />
          <input type="number" name="diskon" placeholder="Diskon" className="border p-2 rounded" onChange={handleChange} />
          <input type="number" name="biayaAdmin" placeholder="Biaya Admin" className="border p-2 rounded" onChange={handleChange} />
          <input type="number" name="biayaIklan" placeholder="Biaya Iklan" className="border p-2 rounded" onChange={handleChange} />
        </div>

        <div className="bg-blue-100 p-4 rounded-lg grid grid-cols-2 gap-3 text-sm">
          <p>Harga Setelah Diskon:</p><p className="font-bold">Rp {formatNumber(hargaSetelahDiskon)}</p>
          <p>Gross Profit:</p><p className="font-bold">Rp {formatNumber(grossProfit)}</p>
          <p>Net Profit:</p><p className="font-bold">Rp {formatNumber(netProfit)}</p>
          <p>Margin:</p><p className="font-bold">{margin.toFixed(2)} %</p>
          <p>Harga Sesuai Markup:</p><p className="font-bold">Rp {formatNumber(markupPrice)}</p>
          <p>ROAS:</p><p className="font-bold">{roas.toFixed(2)} %</p>
        </div>
      </div>
    </div>
  );
}
