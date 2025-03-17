import React from 'react';
import GridBackground from '../components/test/GridBackground';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const TestGridBackground: React.FC = () => {
  return (
    <GridBackground>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Teste do Fundo com Grade</h1>
            <p className="text-gray-300 mb-6">
              Esta página demonstra como o site ficaria com o fundo quadriculado aplicado globalmente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-teal/30 rounded-lg p-5 text-white">
                  <h3 className="text-xl font-bold mb-2">Card de Exemplo {item}</h3>
                  <p className="text-gray-300">
                    O fundo quadriculado dá uma sensação de profundidade e espaço digital ao site.
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-gradient-to-r from-liquid-navy/90 to-black/90 border border-liquid-teal/40 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Como está o visual?</h2>
            <p className="mb-4">
              O padrão de grade quadriculada cria um elemento visual que remete a:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Ambientes digitais e tecnológicos</li>
              <li>Mapas táticos usados em jogos</li>
              <li>HUDs (Heads-Up Displays) de jogos de estratégia</li>
              <li>Sensação de espaço e profundidade</li>
            </ul>
            <div className="bg-liquid-teal/10 border border-liquid-teal/30 p-4 rounded">
              <p className="text-liquid-teal font-medium">
                Esse estilo visual complementa muito bem sites relacionados a jogos, especialmente de estilo tático como Rainbow Six.
              </p>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </GridBackground>
  );
};

export default TestGridBackground; 