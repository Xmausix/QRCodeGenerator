import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;