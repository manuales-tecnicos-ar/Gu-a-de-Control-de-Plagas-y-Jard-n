import React, { useState } from "react";
import { 
  Plus, Minus, Info, AlertTriangle, ShieldCheck, Check, 
  Sparkles, Droplet
} from "lucide-react";

// Helper for empty helper props
interface AssistantProps {}

// -------------------------------------------------------------
// 1. SIMULADOR DE CEBO PARA HORMIGAS (Black Ants Cebo application)
// -------------------------------------------------------------
export function AntSimulator() {
  const [plantCount, setPlantCount] = useState<number>(2);
  const [distanceOption, setDistanceOption] = useState<'on-path' | 'too-far' | 'correct' | 'touched'>('correct');

  const getFidelityResult = () => {
    switch (distanceOption) {
      case 'on-path':
        return {
          title: "❌ Las asustás",
          desc: "Tirar el cebo arriba del caminito las asusta. Van a cambiar de ruta y van a ignorar el veneno por completo.",
          accentColor: "border-red-500 bg-red-50 text-red-900"
        };
      case 'too-far':
        return {
          title: "⚠️ Demasiado Lejos",
          desc: "Si tirás a más de 50cm, es probable que no lo detecten en su rastreo diario. Lo ideal es de 10 a 15 cm.",
          accentColor: "border-amber-500 bg-amber-50 text-amber-900"
        };
      case 'touched':
        return {
          title: "❌ Dejás olor humano",
          desc: "Si tocás el cebo con la mano, las hormigas (que tienen un olfato tremendo) sentirán tu rastro y pasarán por al lado de largo sin llevarlo.",
          accentColor: "border-red-500 bg-red-50 text-red-900"
        };
      default:
        return {
          title: "✅ ¡Perfecto! La posta",
          desc: "Tirado del sachet sin tocar con la mano, a unos 10-15cm del caminito. Lo confunden con alimento y matás la colonia de raíz.",
          accentColor: "border-emerald-500 bg-emerald-50 text-emerald-900"
        };
    }
  };

  const calculatedSachetsNextValue = Math.ceil(plantCount * 0.5);
  const result = getFidelityResult();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans">
      <h4 className="text-sm font-mono text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5" />
        Simulador de Aplicación de Cebo
      </h4>
      <p className="text-xs text-slate-500 mb-5">
        Probá virtualmente cómo reaccionan las hormigas podadoras según dónde sitúes el cebo.
      </p>

      {/* Control sliders */}
      <div className="space-y-4 mb-5">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            ¿Cuántos rosales o limoneros tenés afectados?
          </label>
          <div className="flex items-center gap-3">
            <button 
              id="dec-plants-btn"
              onClick={() => setPlantCount(Math.max(1, plantCount - 1))}
              className="p-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition active:scale-95 text-slate-705 text-slate-700"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-mono font-bold text-sm text-slate-800 w-10 text-center bg-slate-100 py-1 rounded-lg border border-slate-200">
              {plantCount}
            </span>
            <button 
              id="inc-plants-btn"
              onClick={() => setPlantCount(Math.min(10, plantCount + 1))}
              className="p-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition active:scale-95 text-slate-705 text-slate-700"
            >
              <Plus className="w-3 h-3" />
            </button>
            <span className="text-xs text-slate-500 leading-none">
              (Dosis de tratamiento sugerida: {calculatedSachetsNextValue} {calculatedSachetsNextValue === 1 ? 'sachet' : 'sachets'})
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            ¿Dónde vas a colocar los granos de cebo? (Simulá el resultado)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <button 
              id="opt-correct-btn"
              onClick={() => setDistanceOption('correct')}
              className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${distanceOption === 'correct' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-705 hover:bg-slate-50 text-slate-700'}`}
            >
              A 10-15cm de la ruta (Sin tocarlo)
            </button>
            <button 
              id="opt-on-path-btn"
              onClick={() => setDistanceOption('on-path')}
              className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${distanceOption === 'on-path' ? 'border-red-600 bg-red-50 text-red-900' : 'border-slate-200 bg-white text-slate-705 hover:bg-slate-50 text-slate-700'}`}
            >
              Directo sobre el "caminito"
            </button>
            <button 
              id="opt-too-far-btn"
              onClick={() => setDistanceOption('too-far')}
              className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${distanceOption === 'too-far' ? 'border-amber-600 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-705 hover:bg-slate-50 text-slate-700'}`}
            >
              Lejos de la ruta (&gt;50cm)
            </button>
            <button 
              id="opt-touched-btn"
              onClick={() => setDistanceOption('touched')}
              className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${distanceOption === 'touched' ? 'border-red-600 bg-red-50 text-red-900' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              Tocándolo con los dedos
            </button>
          </div>
        </div>
      </div>

      {/* Visual Simulation Canvas wrapper */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 mb-4 relative overflow-hidden h-28 flex flex-col justify-between">
        <div className="absolute top-1.5 right-1.5 text-[9px] font-mono bg-slate-200/80 text-slate-605 px-1.5 py-0.5 rounded uppercase">
          Simulación de Rastro
        </div>

        <div className="relative h-full flex items-center justify-center">
          {/* Ant Caminito line */}
          <div className="absolute w-full h-1 bg-slate-300 left-0 border-t border-dashed border-slate-400"></div>
          
          {/* Ant icons moving */}
          <div className="absolute w-full flex justify-around px-8 top-[36px]">
            <span className="text-xs">🐜</span>
            <span className="text-xs scale-x-[-1]">🐜</span>
            <span className="text-xs">🐜</span>
          </div>

          {/* Cebo granule representation */}
          <div className="absolute flex flex-col items-center" style={{ 
            top: distanceOption === 'correct' ? '8px' : distanceOption === 'on-path' ? '34px' : distanceOption === 'too-far' ? '-10px' : '10px',
            transform: 'translateX(20px)'
          }}>
            <div className="flex gap-0.5 justify-center">
              <span className={`w-1 h-1 rounded-full ${distanceOption === 'touched' ? 'bg-amber-700' : 'bg-green-700'} inline-block`}></span>
              <span className={`w-1 h-1 rounded-full ${distanceOption === 'touched' ? 'bg-amber-705' : 'bg-green-700'} inline-block`}></span>
            </div>
            <span className="text-[8px] font-mono font-bold uppercase text-slate-500 mt-0.5">
              {distanceOption === 'touched' ? 'Cebo (Con perfume humano)' : 'Cebo Puro'}
            </span>
          </div>
        </div>

        <div className="text-[9px] border-t border-slate-200 pt-1.5 text-slate-400 text-center flex items-center justify-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          Las hormigas siguen el rastro químico (línea discontinua).
        </div>
      </div>

      {/* Result feedback panel */}
      <div className={`p-3.5 rounded-xl border text-xs transition-all ${result.accentColor}`}>
        <p className="font-bold mb-1">{result.title}</p>
        <p className="leading-relaxed">{result.desc}</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. MAPA DE GOTAS DE GEL Cucarachas
// -------------------------------------------------------------
export function CockroachKitchenMap() {
  const [drops, setDrops] = useState<{ [key: string]: boolean }>({
    alacena: false,
    motor: false,
    bacha: false,
    mesa: false
  });

  const toggleDrop = (key: string) => {
    setDrops(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getActiveCount = () => Object.values(drops).filter(Boolean).length;
  const isOptimal = drops.alacena && drops.motor && drops.bacha;
  const hasBadChoice = drops.mesa;

  const getTip = () => {
    if (getActiveCount() === 0) {
      return "Hace click sobre los puntos del mapa de la cocina para simular dónde colocar las gotas de gel de la jeringa.";
    }
    if (hasBadChoice) {
      return "⚠️ Pusiste gel directo en la mesada de trabajo. No es lo ideal porque se puede lavar accidentalmente o contaminar alimentos. ¡Mejor usá las bisagras, atrás del motor o adentro del mueble bajo bacha!";
    }
    if (isOptimal) {
      return "😎 ¡Excelente! Elegiste la combinación ideal: Bisagras altas, calidez del motor y humedad cerca del desagüe. Combate el nido entero de forma segura.";
    }
    return "👍 ¡Buen intento! Cuantas más gotitas estratégicas (del tamaño de un grano de lenteja) coloques en zonas oscuras y templadas, más rápido caerá el nido.";
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans">
      <h4 className="text-sm font-mono text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Simulador de Puntos Estratégicos (Gel)
      </h4>
      <p className="text-xs text-slate-500 mb-5">
        Diseñá virtualmente los puntos de colocación del gel mata-cucarachas para lograr el efecto dominó.
      </p>

      {/* Grid selector representing layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        
        {/* Spot 1 */}
        <button
          id="spot-alacena-btn"
          onClick={() => toggleDrop('alacena')}
          className={`p-3 rounded-xl border text-left h-24 flex flex-col justify-between transition ${drops.alacena ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-800 block">🗄️ Bisagra de Alacena</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Oscuridad y altura</span>
          </div>
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider ${drops.alacena ? 'bg-amber-600 text-white' : 'bg-slate-100'}`}>
            {drops.alacena ? 'Colocado ✅' : 'Vacío'}
          </span>
        </button>

        {/* Spot 2 */}
        <button
          id="spot-motor-btn"
          onClick={() => toggleDrop('motor')}
          className={`p-3 rounded-xl border text-left h-24 flex flex-col justify-between transition ${drops.motor ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-800 block">🔌 Detrás de Electrodomésticos</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">El calor del motor</span>
          </div>
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider ${drops.motor ? 'bg-amber-600 text-white' : 'bg-slate-100'}`}>
            {drops.motor ? 'Colocado ✅' : 'Vacío'}
          </span>
        </button>

        {/* Spot 3 */}
        <button
          id="spot-bacha-btn"
          onClick={() => toggleDrop('bacha')}
          className={`p-3 rounded-xl border text-left h-24 flex flex-col justify-between transition ${drops.bacha ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-800 block">🚰 Mueble Bajo Bacha</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Humedad del desagüe</span>
          </div>
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider ${drops.bacha ? 'bg-amber-600 text-white' : 'bg-slate-100'}`}>
            {drops.bacha ? 'Colocado ✅' : 'Vacío'}
          </span>
        </button>

        {/* Spot 4 */}
        <button
          id="spot-mesa-btn"
          onClick={() => toggleDrop('mesa')}
          className={`p-3 rounded-xl border text-left h-24 flex flex-col justify-between transition ${drops.mesa ? 'border-red-400 bg-red-50/40' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-800 block">🍽️ Sobre la Mesada</span>
            <span className="text-[10px] text-slate-405 text-slate-400 block mt-0.5">Abierto y expuesto</span>
          </div>
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider ${drops.mesa ? 'bg-red-600 text-white' : 'bg-slate-100'}`}>
            {drops.mesa ? 'Colocado ⚠️' : 'Vacío'}
          </span>
        </button>

      </div>

      {/* Feedback Banner */}
      <div className={`p-4 rounded-xl border text-xs transition duration-350 ${hasBadChoice ? 'bg-red-50 border-red-200 text-red-950' : isOptimal ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : getActiveCount() > 0 ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
        <p className="font-semibold flex items-center gap-1.5 mb-1 text-slate-800">
          📍 Consejos de Aplicación:
        </p>
        <p className="leading-relaxed">{getTip()}</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. COMPARADOR DE PULVERIZADORES
// -------------------------------------------------------------
export function SprayerSelector() {
  const [gardenArea, setGardenArea] = useState<number>(40);
  const [oringState, setOringState] = useState<boolean>(true);

  const isBackpack = gardenArea > 150;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans">
      <h4 className="text-sm font-mono text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        Calculador de Capacidad Recomenda
      </h4>
      <p className="text-xs text-slate-500 mb-5 text-slate-600">
        Ingresá la superficie aproximada de tu patio o jardín para determinar el tipo de fumigador óptimo.
      </p>

      {/* Sliders */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Superficie del patio o parque:
          </label>
          <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
            {gardenArea} m²
          </span>
        </div>
        <input 
          id="garden-area-slider"
          type="range"
          min="5"
          max="800"
          value={gardenArea}
          onChange={(e) => setGardenArea(parseInt(e.target.value))}
          className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>5 m² (Balcón / Macetas)</span>
          <span>150 m² (Patio Mediano)</span>
          <span>800 m² (Fondo grande / Quinta)</span>
        </div>
      </div>

      {/* Recommended Category Displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        
        {/* Option A */}
        <div className={`p-4 rounded-xl border relative flex flex-col justify-between transition-all ${!isBackpack ? 'border-blue-600 bg-blue-50/20 shadow-sm' : 'border-slate-200 bg-white opacity-60'}`}>
          {!isBackpack && (
            <span className="absolute -top-2.5 right-3 bg-blue-600 text-white font-mono font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full">
              Sugerido para tu área
            </span>
          )}
          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-1">Pulverizador de Presión Previa (1.5 a 2 Litros)</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Le das bomba con la manija superior para generar aire a presión y fumigar de corrido plantas chicas o balcones.
            </p>
          </div>
        </div>

        {/* Option B */}
        <div className={`p-4 rounded-xl border relative flex flex-col justify-between transition-all ${isBackpack ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-slate-200 bg-white opacity-60'}`}>
          {isBackpack && (
            <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white font-mono font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full">
              Sugerido para tu área
            </span>
          )}
          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-1">Pulverizador de Mochila (12 a 20 Litros)</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Para colgarse en la espalda con arnés. Permite bombear con una palanca lateral y rociar grandes extensiones sin agacharse.
            </p>
          </div>
        </div>

      </div>

      {/* Simulator check for rings */}
      <div className="border border-slate-200 rounded-xl bg-slate-50 p-4">
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-250">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
            💦 Desgaste y Limpieza de O-Rings
          </span>
          <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-mono font-bold ${oringState ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {oringState ? 'Gomas lubricadas' : 'Orring Reseco'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          ¿Enjuagás con agua limpia el bidón y pasás agua por la lanza al terminar de pulverizar?
        </p>

        <div className="flex gap-2 text-xs">
          <button 
            id="oring-clean-btn"
            onClick={() => setOringState(true)}
            className={`flex-1 py-1 px-2.5 rounded-lg border text-center transition ${oringState ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
          >
            SÍ - Enjuago siempre
          </button>
          <button 
            id="oring-leave-btn"
            onClick={() => setOringState(false)}
            className={`flex-1 py-1 px-2.5 rounded-lg border text-center transition ${!oringState ? 'bg-red-50 border-red-300 text-red-800 font-semibold' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
          >
            NO - Lo guardo como está
          </button>
        </div>

        {!oringState && (
          <div className="mt-3 text-red-950 border border-red-200 bg-red-50/70 p-2.5 rounded-lg text-[11px]">
            <strong>⚠️ ¡Atención!</strong> Si dejás el herbicida o veneno adentro del tanque, los o-rings de goma se resecan y la máquina perderá la presión de trabajo.
          </div>
        )}
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 4. SIMULADOR DE MALEZA
// -------------------------------------------------------------
export function WeedSimulator() {
  const [herbicideType, setHerbicideType] = useState<'total' | 'selectivo'>('selectivo');
  const [isApplied, setIsApplied] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans">
      <h4 className="text-sm font-mono text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5" />
        Simulador Visual de Herbicidas
      </h4>
      <p className="text-xs text-slate-500 mb-5">
        ¿Glifosato Total o Selectivo para Hoja Ancha? Simulá la diferencia para salvar el césped útil de tu jardín.
      </p>

      {/* Select buttons */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
        <button
          id="herbicide-selectivo-btn"
          onClick={() => { setHerbicideType('selectivo'); setIsApplied(false); }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${herbicideType === 'selectivo' ? 'bg-white shadow text-emerald-800' : 'text-slate-600 hover:text-slate-800'}`}
        >
          ☘️ Herbicida SELECTIVO
        </button>
        <button
          id="herbicide-total-btn"
          onClick={() => { setHerbicideType('total'); setIsApplied(false); }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${herbicideType === 'total' ? 'bg-white shadow text-rose-900' : 'text-slate-600 hover:text-slate-850'}`}
        >
          💀 Herbicida TOTAL (Glifosato)
        </button>
      </div>

      {/* Screen Canvas area */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-900 text-white relative h-32 flex flex-col justify-between overflow-hidden">
        
        {/* Background garden simulation */}
        <div className="flex justify-around items-end h-full pt-1.5">
          
          <div className="flex flex-col items-center">
            <span className={`text-2xl transition-all duration-[1000ms] ${isApplied ? (herbicideType === 'total' ? 'brightness-50 saturate-0 scale-90 translate-y-1' : 'brightness-120') : ''}`}>
              🌱
            </span>
            <span className="text-[10px] text-slate-400">Césped Bermuda</span>
            <span className={`text-[8px] font-mono uppercase px-1 rounded block ${isApplied ? (herbicideType === 'total' ? 'bg-red-955 bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300') : 'bg-slate-800 text-slate-305'}`}>
              {isApplied ? (herbicideType === 'total' ? 'Secado 💀' : 'Sano 💖') : 'Excelente'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className={`text-2xl transition-all duration-[1000ms] ${isApplied ? 'brightness-50 saturate-0 scale-75 translate-y-2' : ''}`}>
              🍀
            </span>
            <span className="text-[10px] text-slate-400">Maleza de Hoja Ancha</span>
            <span className={`text-[8px] font-mono uppercase px-1 rounded block ${isApplied ? 'bg-red-950 text-red-300' : 'bg-slate-850 text-slate-305'}`}>
              {isApplied ? 'Secado 💀' : 'Yuyos'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className={`text-2xl transition-all duration-[1000ms] ${isApplied ? (herbicideType === 'total' ? 'brightness-50 saturate-0 scale-90 translate-y-1' : 'brightness-120') : ''}`}>
              🌿
            </span>
            <span className="text-[10px] text-slate-400">Grama Bahiana</span>
            <span className={`text-[8px] font-mono uppercase px-1 rounded block ${isApplied ? (herbicideType === 'total' ? 'bg-red-950 text-red-303 text-red-300' : 'bg-emerald-950 text-emerald-300') : 'bg-slate-800'}`}>
              {isApplied ? (herbicideType === 'total' ? 'Secado 💀' : 'Sano 💖') : 'Excelente'}
            </span>
          </div>

        </div>

        {/* Action triggers */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-1 text-[10px]">
          <span className="text-slate-450 text-slate-400 leading-none">
            {herbicideType === 'selectivo' ? 'Fórmula que respeta gramíneas' : 'Arrasa con todo follaje verde'}
          </span>
          <button
            id="simulate-spray-btn"
            onClick={() => setIsApplied(prev => !prev)}
            className="bg-emerald-700 hover:bg-emerald-600 font-sans text-[9px] font-bold px-2 py-0.5 rounded tracking-wide text-white uppercase active:scale-95 transition"
          >
            {isApplied ? 'Reiniciar' : '💨 Aplicar'}
          </button>
        </div>
      </div>

      {/* Safety notification tip */}
      <div className="mt-4 p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-xs flex items-start gap-2.5">
        <AlertTriangle className="w-4.5 h-4.5 text-orange-600 shrink-0 mt-0.5" />
        <div>
          <strong>¡Atención técnica!</strong> El herbicida selectivo diluido no daña tu césped Bermuda ni Grama Bahiana, pero matará tréboles y yuyo sapo de inmediato. Usá guantes.
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. SIMULADOR DE CARACOLES Y BABOSAS
// -------------------------------------------------------------
export function SnailSimulator() {
  const [placement, setPlacement] = useState<'voleo' | 'montoncitos'>('montoncitos');
  const [protectPets, setProtectPets] = useState<boolean>(true);

  const getSnailOutcome = () => {
    if (placement === 'voleo') {
      return {
        title: "⚠️ Eficacia baja + Peligro para mascotas",
        desc: "Tirados sueltos en el pasto se deshacen rápido con el rocío de la mañana y pierden atracción. Además, quedan expuestos para pájaros y mascotas.",
        color: "border-amber-500 bg-amber-50 text-amber-900"
      };
    }
    
    if (protectPets) {
      return {
        title: "✅ ¡Estrategia Suprema de la Posta!",
        desc: "Montoncitos refugiados debajo de tejas, macetas invertidas o dentro de una tapita dada vuelta. El caracol busca la oscuridad y come el pellet. Tus mascotas están totalmente protegidas porque no los alcanzan.",
        color: "border-emerald-500 bg-emerald-50 text-emerald-950"
      };
    }

    return {
      title: "👍 Buen control, pero ojo con las mascotas",
      desc: "Los montoncitos concentran el olor de atracción en zonas con sombra y hojarasca. Sin embargo, si tenés perros o gatos, es mejor refugiarlos adentro de tapitas o bajo tejas.",
      color: "border-blue-500 bg-blue-50 text-blue-950"
    };
  };

  const outcome = getSnailOutcome();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans">
      <h4 className="text-sm font-mono text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5" />
        Simulador de Cebo para Caracoles
      </h4>
      <p className="text-xs text-slate-500 mb-5">
        Elegí la forma de repartir el molusquicida granulado para maximizar el control nocturno de forma segura.
      </p>

      {/* Selectors */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            ¿Cómo vas a tirar los micropellets en el jardín?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="snail-voleo-btn"
              onClick={() => setPlacement('voleo')}
              className={`p-2.5 text-xs rounded-xl border text-center transition font-semibold ${placement === 'voleo' ? 'border-amber-600 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              Al voleo sueltos por el césped
            </button>
            <button
              id="snail-piles-btn"
              onClick={() => setPlacement('montoncitos')}
              className={`p-2.5 text-xs rounded-xl border text-center transition font-semibold ${placement === 'montoncitos' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              En pequeños montonitos
            </button>
          </div>
        </div>

        {placement === 'montoncitos' && (
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <input
              id="snail-pets-checkbox"
              type="checkbox"
              checked={protectPets}
              onChange={(e) => setProtectPets(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="snail-pets-checkbox" className="text-xs text-slate-700 font-semibold cursor-pointer select-none">
              🐾 Aplicar técnica protectora (Adentro de tapitas dada vuelta o bajo teja)
            </label>
          </div>
        )}
      </div>

      {/* Simulation Box */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-900 text-white relative h-28 flex flex-col justify-between overflow-hidden mb-4">
        <div className="text-[10px] text-slate-400 font-mono flex justify-between">
          <span>Vista de noche 🌙</span>
          <span>{placement === 'voleo' ? 'Pellets dispersos' : protectPets ? 'Pellets escondidos (Bajo teja) 🏠' : 'Montoncitos libres'}</span>
        </div>

        <div className="flex justify-around items-end h-full font-mono pb-2">
          {placement === 'voleo' ? (
            <div className="text-center w-full flex justify-around text-xs text-slate-405">
              <span>🍃 🔵 (Pellet solo mojado)</span>
              <span>🐌 (Pasa de largo) 🐌</span>
              <span>🔵 🍃</span>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full px-4 text-xs">
              <div className="flex flex-col items-center">
                <span>{protectPets ? '🧱🏡' : '🔵🔵🔵'}</span>
                <span className="text-[9px] text-slate-400">Punto de atracción</span>
              </div>
              <span className="text-xl animate-bounce">🐌💨</span>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 block font-bold">¡Imantados!</span>
                <span className="text-[8px] text-slate-400 block">Van directo a comer</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Outcome block */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${outcome.color}`}>
        <p className="font-bold mb-1">{outcome.title}</p>
        <p>{outcome.desc}</p>
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 6. SIMULADOR DE COCHINILLAS & PRODUCTOS SISTÉMICOS
// -------------------------------------------------------------
export function ScaleInsectSimulator() {
  const [productType, setProductType] = useState<'aerosol' | 'sistemico'>('sistemico');
  const [plantDest, setPlantDest] = useState<'ornamental' | 'frutal'>('ornamental');

  const getScaleOutcome = () => {
    if (productType === 'aerosol') {
      return {
        title: "❌ ¡Gasto inútil de veneno!",
        desc: "La cochinilla tiene caparazones rígidas o cera algodonosa repelente. El insecticida que tires pulverizado por afuera resbala como agua y no les hace nada. El bicho sigue consumiendo la energía de la planta.",
        color: "border-red-400 bg-red-50 text-red-950"
      };
    }

    if (plantDest === 'frutal') {
      return {
        title: "✅ Máxima eficiencia pero con ¡Mucha precaución!",
        desc: "El insecticida sistémico entra en la savia de la planta y liquida a la cochinilla cuando clava su pico. Pero como es un frutal/huerta comestible, respetá rigurosamente el 'período de carencia' de 15 a 20 días sin cosechar nada, para asegurar que el agroquímico se desintegre por completo.",
        color: "border-amber-500 bg-amber-50 text-amber-950"
      };
    }

    return {
      title: "✅ ¡Éxito absoluto en plantas de jardín o flores!",
      desc: "Excelente elección. El sistémico satura la savia de tu jazmín, rosal o planta decorativa. Los picos muerden y mueren de adentro hacia afuera, erradicando plagas invisibles o escondidas en el reverso de la hoja.",
      color: "border-emerald-500 bg-emerald-50 text-emerald-950"
    };
  };

  const outcome = getScaleOutcome();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm font-sans flex flex-col justify-between">
      <div>
        <h4 className="text-sm font-mono text-amber-805 text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Simulador de Acción (Sistémico vs Contacto)
        </h4>
        <p className="text-xs text-slate-500 mb-5">
          Comprendé la diferencia científica de cómo actúa el veneno según el escudo protector de la cochinilla blanca.
        </p>

        {/* Selectors */}
        <div className="space-y-4 mb-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              1. Elegí el tipo de insecticida que vas a aplicar:
            </label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                id="scale-aerosol-btn"
                onClick={() => setProductType('aerosol')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${productType === 'aerosol' ? 'bg-white shadow text-red-900' : 'text-slate-600'}`}
              >
                Aerosol / Fumigado Común (Contacto)
              </button>
              <button
                id="scale-sistemico-btn"
                onClick={() => setProductType('sistemico')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${productType === 'sistemico' ? 'bg-white shadow text-emerald-900' : 'text-slate-600'}`}
              >
                Insecticida SISTÉMICO (Absorbido)
              </button>
            </div>
          </div>

          {productType === 'sistemico' && (
            <div>
              <label className="text-xs font-semibold text-slate-705 text-slate-700 block mb-1.5">
                2. ¿Dónde lo estás aplicando?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="scale-ornamental-btn"
                  onClick={() => setPlantDest('ornamental')}
                  className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${plantDest === 'ornamental' ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                  Flores / Plantas Ornamentales (Jazmín, etc.)
                </button>
                <button
                  id="scale-frutal-btn"
                  onClick={() => setPlantDest('frutal')}
                  className={`p-2 text-xs rounded-xl border text-center transition font-semibold ${plantDest === 'frutal' ? 'border-amber-600 bg-amber-50 text-amber-955 text-amber-950' : 'border-slate-200 bg-white text-slate-703 hover:bg-slate-50'}`}
                >
                  Frutales / Huerta de alimentos (Limonero, etc.)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Simulation illustration */}
        <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 mb-4 h-24 flex items-center justify-between text-xs relative overflow-hidden">
          <div className="absolute top-1 right-1.5 text-[8px] font-mono text-slate-400 bg-slate-200 rounded px-1 group-hover:scale-105 transition-all">
            MODO: {productType === 'aerosol' ? 'CONTACTO' : 'SISTÉMICO'}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="font-bold text-slate-800">Interior de la Planta</p>
              <p className="text-[10px] text-slate-500 font-mono">
                {productType === 'aerosol' ? '✖️ Sin toxinas' : '🟢 Savia activa protectora'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl relative">
              🛡️🐛
              {productType === 'sistemico' && (
                <span className="absolute -top-1.5 -right-1 text-[10px] animate-ping">💀</span>
              )}
            </span>
            <span className="text-[9px] text-slate-500 font-mono mt-1 text-center leading-none">
              {productType === 'aerosol' ? 'Repele el líquido' : 'Muere al succionar'}
            </span>
          </div>
        </div>
      </div>

      {/* Outcome text */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${outcome.color}`}>
        <p className="font-bold mb-1">{outcome.title}</p>
        <p>{outcome.desc}</p>
      </div>

    </div>
  );
}

