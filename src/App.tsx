import React, { useState } from "react";
import { GUIDE_BLOCKS } from "./data/guides";
import Header from "./components/Header";
import ProblemCard from "./components/ProblemCard";
import { VirtualAgronomist } from "./components/VirtualAgronomist";
import { 
  ShieldAlert, Sparkles, Filter, Check, Eye, BookOpen, 
  HelpCircle, MessageSquareWarning 
} from "lucide-react";

export default function App() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredBlocks = activeFilter === "all" 
    ? GUIDE_BLOCKS 
    : GUIDE_BLOCKS.filter(b => b.id === activeFilter);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans pb-24">
      {/* Container limit wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Header */}
        <Header />

        {/* Categories Tab Selector / Filter */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4.5 h-4.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-705 text-slate-700 uppercase tracking-wider">
              Filtrar por problema:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              id="filter-all-btn"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "all" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              📖 Todas las Guías ({GUIDE_BLOCKS.length})
            </button>
            <button
              id="filter-ants-btn"
              onClick={() => setActiveFilter("hormigas")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "hormigas" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              🐜 Hormigas Podadoras
            </button>
            <button
              id="filter-roaches-btn"
              onClick={() => setActiveFilter("cucarachas")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "cucarachas" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              🪳 Cucarachas de Cocina
            </button>
            <button
              id="filter-sprayers-btn"
              onClick={() => setActiveFilter("pulverizadores")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "pulverizadores" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              💦 Pulverizadores
            </button>
            <button
              id="filter-weeds-btn"
              onClick={() => setActiveFilter("guerra-yuyos")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "guerra-yuyos" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              🌿 Malezas y Césped
            </button>
            <button
              id="filter-slugs-btn"
              onClick={() => setActiveFilter("caracoles")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "caracoles" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              🦪 Caracoles y Babosas
            </button>
            <button
              id="filter-scale-btn"
              onClick={() => setActiveFilter("cochinillas")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === "cochinillas" ? "bg-emerald-950 text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
            >
              🛡️ Cochinillas y Sistémicos
            </button>
          </div>
        </div>

        {/* Dashboard split content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Guides Column (left 2-span) */}
          <div className="lg:col-span-2 space-y-8">
            <VirtualAgronomist />
            
            {filteredBlocks.map((block) => (
              <ProblemCard 
                key={block.id} 
                block={block} 
              />
            ))}
          </div>

          {/* Right Column (Safety and Useful Context) */}
          <div className="space-y-8">
            
            {/* Asesor de Seguridad y Cuidado de la Salud */}
            <div className="bg-amber-950 text-amber-50 border border-amber-900 rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-900 rounded-bl-full opacity-30 pointer-events-none"></div>
              
              <h4 className="text-sm font-mono text-amber-305 text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Seguridad de Agroquímicos
              </h4>

              <p className="text-xs text-amber-200/90 leading-relaxed mb-4">
                La fumigación y el control de plagas requieren máxima seriedad. Guardá todos los productos fuera del alcance de los chicos y de tus mascotas domésticas.
              </p>

              <div className="border-t border-amber-900 pt-4 space-y-3 font-sans text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400">🚨</span>
                  <div>
                    <p className="font-bold text-amber-100">Guantes y Anteojos</p>
                    <p className="text-amber-300/80 text-[11px] leading-relaxed">
                      Obligatorio al diluir y pulverizar herbicidas de malezas o insecticidas de jardín.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400">🐾</span>
                  <div>
                    <p className="font-bold text-amber-100">Mascotas Protegidas</p>
                    <p className="text-amber-300/80 text-[11px] leading-relaxed">
                      Ubicá la jeringa gel profunda en las bisagras. Evitá que perros o gatos jueguen en el pasto recién rociado hasta que esté totalmente seco.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400">🏥</span>
                  <div>
                    <p className="font-bold text-amber-100">Línea de Intoxicaciones</p>
                    <p className="text-amber-300/80 text-[11px] leading-relaxed">
                      TAS (Toxicología Asesoramiento) Argentina: 0800-888-TOX (8690) o Guardias Médicas 24 hs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-900 text-[10px] text-amber-350 text-amber-300/55 text-center font-mono">
                Uso responsable • Cuidado de la biodiversidad
              </div>
            </div>

            {/* Guía rápida de primeros pasos */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-600 space-y-4">
              <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <BookOpen className="w-4.5 h-4.5 text-emerald-600" />
                Preguntas Frecuentes Jardineras
              </h5>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong className="text-slate-750 text-slate-800">¿El cebo granulado se vence?</strong>
                  <br />
                  <span className="text-slate-500">Sí, con la humedad se infla y pierde poder atrayente de inmediato. Mantenelo hermético y seco después de abrirlo.</span>
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-750 text-slate-800">¿Es peligroso el gel de cucarachas en la cocina?</strong>
                  <br />
                  <span className="text-slate-500">No si se coloca en gotitas chiquitas escondidas (tamaño lenteja) en bisagras o recovecos inaccesibles para utensilios, niños o mascotas.</span>
                </p>
                <p className="leading-relaxed">
                  <strong className="text-slate-750 text-slate-800">¿Cómo rinde un herbicida selectivo?</strong>
                  <br />
                  <span className="text-slate-500">Cada centímetro cúbico rinde un montón. Diluilo exactamente como indica el envase a la tarde para evitar que el sol fuerte lo queme por evaporación.</span>
                </p>
              </div>
            </div>

            {/* Disclaimer General */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center text-[10px] text-slate-400 font-mono">
              La dosificación exacta y la manipulación segura siempre deben confirmarse leyendo atentamente las etiquetas de los respectivos fabricantes antes de operar cualquier agroquímico en el patio.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
