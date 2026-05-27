import { ShieldCheck, Leaf, Sprout, Bug } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-emerald-950 text-emerald-50 relative overflow-hidden py-16 px-6 md:px-12 rounded-3xl border border-emerald-800 shadow-2xl mb-12">
      {/* Visual background accents */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-800 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-emerald-600 rounded-full opacity-10 blur-xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-emerald-800 text-emerald-300 font-mono text-xs uppercase px-3 py-1 rounded-full tracking-wider border border-emerald-700 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Asesores de Confianza
          </span>
          <span className="bg-amber-900/40 text-amber-200 font-mono text-xs uppercase px-3 py-1 rounded-full tracking-wider border border-amber-800/60 flex items-center gap-1.5 shadow-sm">
            <Sprout className="w-3.5 h-3.5 text-amber-400" />
            100% Práctico e Interactivo
          </span>
        </div>

        <h1 id="main-title" className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight mb-4 text-white">
          Guía de Control de Plagas para tu Hogar y Jardín
        </h1>
        
        <p className="text-lg text-emerald-200/90 font-sans max-w-2xl leading-relaxed">
          Consejos reales, efectivos y sin vueltas para mantener tu jardín impecable y librarte de las plagas domésticas de raíz. Desde hormigas podadoras hasta yuyos rebeldes. ¡Cuidá lo tuyo como un profesional!
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-emerald-900/60 text-emerald-200/70 font-sans text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900/50 rounded-lg text-emerald-400">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-emerald-100">Cuidado del Rosal</p>
              <p className="text-emerald-300/60">Limoneros y flores impecables</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900/50 rounded-lg text-emerald-400">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-emerald-100 font-sans">Sin Cucarachas</p>
              <p className="text-emerald-300/60">Alacenas seguras de verdad</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900/50 rounded-lg text-emerald-400">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-emerald-100 font-sans">Salvá tu Césped</p>
              <p className="text-emerald-300/60">Chau trébol y yuyo sapo</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900/50 rounded-lg text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-emerald-100 font-sans">Uso Seguro</p>
              <p className="text-emerald-300/60">Indicaciones de seguridad</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
