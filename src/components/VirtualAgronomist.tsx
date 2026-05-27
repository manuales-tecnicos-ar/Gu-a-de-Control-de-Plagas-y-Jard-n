import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  ShoppingBag, 
  HelpCircle, 
  User, 
  Smartphone,
  Check
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function VirtualAgronomist() {
  const [activeTab, setActiveTab] = useState<"tree" | "chat">("tree");
  
  // -------------------------------------------------------------
  // DECISION TREE STATES
  // -------------------------------------------------------------
  const [treeStep, setTreeStep] = useState<"welcome" | "ants" | "scale" | "snails" | "weeds" | "spray" | "roaches">("welcome");
  const [antsSubStep, setAntsSubStep] = useState<"question" | "cut_leaves" | "mounds">("question");
  const [scaleSubStep, setScaleSubStep] = useState<"question" | "answer">("question");
  const [weedsSubStep, setWeedsSubStep] = useState<"question" | "total" | "selective">("question");
  const [spraySubStep, setSpraySubStep] = useState<"question" | "small" | "large">("question");

  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const triggerPurchaseSim = (productName: string) => {
    setPurchaseSuccess(productName);
    setTimeout(() => {
      setPurchaseSuccess(null);
    }, 4000);
  };

  const resetTree = () => {
    setTreeStep("welcome");
    setAntsSubStep("question");
    setScaleSubStep("question");
    setWeedsSubStep("question");
    setSpraySubStep("question");
  };

  // -------------------------------------------------------------
  // AI FREE TEXT CHAT STATES
  // -------------------------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-ai",
      role: "assistant",
      text: "¡Buenas, chamigo! Soy tu Asistente Agrónomo Virtual de SolucionesHobbista. 🌿\n\nContame qué síntomas ves en las plantas, qué bicho te está haciendo renegar o si necesitás saber cómo pulverizar el patio. Te voy a tirar la posta técnica bien a lo criollo."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isLoading]);

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    
    const userMsgId = `user-${Date.now()}`;
    const newMessages = [...chatMessages, { id: userMsgId, role: "user", text: userText } as ChatMessage];
    setChatMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          history: chatMessages.slice(-6).map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Respuesta de red no ok");
      }

      const data = await response.json();
      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: data.text || "Disculpá hermano, se me complicaron las conexiones con la cueva."
        }
      ]);
    } catch (err) {
      console.error(err);
      // Failover response using an offline responsive simulation
      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          text: `### 1) Diagnóstico a lo criollo\n¡Hubo una desconexión campera ahí!\n\n*(No pudimos conectar con los satélites, pero acá te tiro un consejo express)*. Si consultabas por **hormigas**, meté cebo Mirex sin tocarlo. Si es por **plagas pegajosas como cochinilla**, necesitás un insecticida sistémico como Glacoxan D-Sist. Si andás con **yuyos sobre el césped**, aplicá herbicida selectivo de hoja ancha a la tardecita.\n\n¿Por qué otro bicho querías consultarme?`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl font-sans mb-12">
      {/* Bot Header Block */}
      <div className="bg-emerald-950 text-white p-6 relative">
        <div className="absolute top-4 right-4 bg-emerald-800/80 text-emerald-300 border border-emerald-700 rounded-full py-1 px-3 flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          GUARDIA ACTIVA
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-3xl shadow-inner border-2 border-emerald-400">
              🧔🌾
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-emerald-950 animate-pulse"></span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold tracking-tight">Ingeniero Agrónomo Virtual</h3>
            <p className="text-xs text-emerald-300/90 font-mono">Asesoramiento Técnico Rural & Urbano</p>
          </div>
        </div>

        {/* Tab Selection buttons */}
        <div className="flex mt-6 bg-emerald-900/60 p-1 rounded-xl border border-emerald-800/80">
          <button
            id="tab-tree-btn"
            onClick={() => setActiveTab("tree")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "tree" ? "bg-emerald-950 text-white shadow border border-emerald-700/80" : "text-emerald-300 hover:bg-emerald-900/40"}`}
          >
            🌳 Árbol de Decisión (Paso a Paso)
          </button>
          <button
            id="tab-chat-btn"
            onClick={() => setActiveTab("chat")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "chat" ? "bg-emerald-950 text-white shadow border border-emerald-700/80" : "text-emerald-300 hover:bg-emerald-900/40"}`}
          >
            💬 Consultorio Libre con Inteligencia Artificial
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white min-h-[420px] max-h-[580px] flex flex-col justify-between overflow-y-auto p-6">
        
        {/* TAB 1: DECISION TREE */}
        {activeTab === "tree" && (
          <div className="flex flex-col justify-between h-full space-y-6">
            
            {/* WELCOME STEP */}
            {treeStep === "welcome" && (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:p-5 flex gap-3">
                  <span className="text-3xl select-none">🌿</span>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800 text-sm">Mensaje de Bienvenida (El Gancho)</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      "¡Buenas! Soy tu Asistente Agrónomo Virtual de <strong>SolucionesHobbista</strong>. 🌿 Veo que andás con problemas en el jardín o en casa. Para ayudarte a salvar tus plantas rápido, decime: ¿Qué bicho o problema tenés hoy?"
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Seleccioná una plaga o consulta:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      id="branch-ants-btn"
                      onClick={() => setTreeStep("ants")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">🪵</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm">Hormigas Cortadoras</p>
                          <p className="text-[11px] text-slate-500">Plantas peladas, caminitos o tierra apilada</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>

                    <button
                      id="branch-scale-btn"
                      onClick={() => setTreeStep("scale")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">🛡️</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm">Cochinillas, Pulgones y Bichitos Pegados</p>
                          <p className="text-[11px] text-slate-500">Algondonoso blanco, pegote, bichitos pegados</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>

                    <button
                      id="branch-snails-btn"
                      onClick={() => setTreeStep("snails")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">🦪</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm">Caracoles y Babosas</p>
                          <p className="text-[11px] text-slate-500">Hojas masticadas de noche, caminos de baba</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>

                    <button
                      id="branch-weeds-btn"
                      onClick={() => setTreeStep("weeds")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">🌾</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm font-sans">Malezas y Yuyos en el Césped</p>
                          <p className="text-[11px] text-slate-500">Trébol, diente de león y limpieza de veredas</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>

                    <button
                      id="branch-roaches-btn"
                      onClick={() => setTreeStep("roaches")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">🪳</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm font-sans">Cucarachas y Plagas del Hogar</p>
                          <p className="text-[11px] text-slate-500">Control efectivo en cocinas, grietas y rincones</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>

                    <button
                      id="branch-spray-btn"
                      onClick={() => setTreeStep("spray")}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 group text-left transition-all md:col-span-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">💦</span>
                        <div>
                          <p className="font-bold text-slate-800 text-xs text-sm font-sans">Fumigación Eficiente y Pulverizadores</p>
                          <p className="text-[11px] text-slate-500">Qué herramienta elegir según tu espacio de patio o jardín</p>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors font-sans font-bold">→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RAMA 1: HORMIGAS CORTADORAS */}
            {treeStep === "ants" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: HORMIGAS</span>
                </div>

                {antsSubStep === "question" && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-3 text-sm">
                      <span className="text-2xl">🧔🌾</span>
                      <div>
                        <p className="font-bold text-slate-800">Pregunta del Agrónomo:</p>
                        <p className="text-slate-650 font-serif italic text-base">"¿Qué daño ves? ¿Te están dejando las plantas peladas (cortan la hoja) o ves montañitas de tierra en el pasto?"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        id="ants-leaves-btn"
                        onClick={() => setAntsSubStep("cut_leaves")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🍂</span>
                        <span className="block font-bold text-slate-800 text-sm">Cortan hojas</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Hojas cortadas tipo medialuna o rosales sin hojas en horas.</span>
                      </button>

                      <button
                        id="ants-mounds-btn"
                        onClick={() => setAntsSubStep("mounds")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🧱</span>
                        <span className="block font-bold text-slate-800 text-sm">Ves montañitas de tierra</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Tierra suelta apilada en el césped formando minas o cámaras.</span>
                      </button>
                    </div>
                  </div>
                )}

                {antsSubStep === "cut_leaves" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex gap-2 text-amber-900 font-semibold shadow-sm">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      Diagnóstico: Hormiga Negra Podadora (Acromyrmex/Atta).
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm space-y-3">
                      <p className="font-bold text-slate-800">Respuesta Experta:</p>
                      <p className="text-slate-600 leading-relaxed font-sans">
                        "Típico de la hormiga podadora, che. No gastes en aerosoles porque la reina está bajo tierra. La solución es el <strong>Cebo Granulado</strong>. Las hormigas lo llevan al nido pensando que es comida y desinfectan la colonia desde adentro de raíz."
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl space-y-2">
                      <p className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase">Recomendación de Aplicación Directa</p>
                      <p className="text-xs text-slate-650 leading-relaxed">
                        <strong>Tip del Agrónomo:</strong> "¡Clave! Nunca toques el cebo con las manos. Usá el sachet directo, porque si le dejás olor humano, no lo llevan al hormiguero y pasan de largo."
                      </p>
                    </div>

                    <a
                      id="buy-ants-cebo"
                      href="https://meli.la/1mkF4F6"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Cebo Granulado Mirex")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Conseguir Cebo Granulado Profesional
                    </a>
                  </div>
                )}

                {antsSubStep === "mounds" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs flex gap-2 text-blue-900 font-semibold shadow-sm">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      Diagnóstico: Hormiga Minera / Colorada Subterránea.
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm">
                      <p className="font-bold text-slate-800 mb-1">Respuesta Experta:</p>
                      <p className="text-slate-600 leading-relaxed">
                        "¡Ah, esa es la hormiga de pozo! Te llena el césped de montañitas de tierra suelta que te arruina la cuchilla de la cortadora de césped. Para atacarlas, podés usar cebo resistente a la humedad o aplicar un polvo soplado directo en la entrada del hormiguero con un soplete insuflador doméstico."
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href="https://meli.la/27GZgvQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerPurchaseSim("Insuflador de Polvo")}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Comprar Insuflador de Polvo Profesional
                      </a>
                      <a
                        href="https://meli.la/2SQNXBR"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerPurchaseSim("Polvo Insecticida")}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 font-bold py-3 px-5 rounded-xl transition shadow text-center"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Comprar Polvo para Insuflador
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RAMA 2: COCHINILLAS, PULGONES Y BICHITOS PEGADOS */}
            {treeStep === "scale" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: COCHINILLAS & PULGONES</span>
                </div>

                {scaleSubStep === "question" && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-3 text-sm">
                      <span className="text-2xl">🧔🌾</span>
                      <div>
                        <p className="font-bold text-slate-800">Pregunta del Agrónomo:</p>
                        <p className="text-slate-650 font-serif italic text-base">"¿El bichito tiene un escudo duro pegado a las ramas o parece un algodón blanco algodonoso?"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        id="scale-shield-btn"
                        onClick={() => setScaleSubStep("answer")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🛡️</span>
                        <span className="block font-bold text-slate-800 text-sm">Escudo duro o ceroso</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Parecen pequeñas escamas rígidas pegadas a las ramas del limonero o rosal.</span>
                      </button>

                      <button
                        id="scale-cotton-btn"
                        onClick={() => setScaleSubStep("answer")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">☁️</span>
                        <span className="block font-bold text-slate-800 text-sm">Algodón blanco pegado</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Plaga algodonosa muy pegajosa en axilas de hojas o reverso.</span>
                      </button>
                    </div>
                  </div>
                )}

                {scaleSubStep === "answer" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex gap-2 text-amber-900 font-semibold shadow-sm">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      Diagnóstico: Plaga succionadora con protección de cera repelente.
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm space-y-3">
                      <p className="font-bold text-slate-800">Respuesta Experta:</p>
                      <p className="text-slate-600 leading-relaxed">
                        "Eseras son cochinillas, chamigo. Como tienen un 'escudo' de cera que repele cualquier veneno que les tires por afuera, si les tirás un aerosol común, el líquido resbala y el bicho sigue succionando la savia de tu planta como si nada. 
                        <strong>Necesitás un Insecticida Sistémico.</strong> Lo diluís en agua y lo aplicás pulverizando o regando. La planta lo absorbe, y cuando la cochinilla clava su pico para comer, absorbe el veneno por dentro de la savia y muere."
                      </p>
                    </div>

                    <div className="bg-red-50 border border-red-150 p-4 rounded-2xl space-y-1 text-red-950">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-red-800">
                        <AlertTriangle className="w-4 h-4" />
                        ADVERTENCIA METICULOSA (Regla de Oro)
                      </div>
                      <p className="text-xs leading-relaxed">
                        <strong>Tip del Agrónomo:</strong> "Si lo vas a usar en cítricos o huerta (tomates, limoneros, etc.), acordate de esperar 20 días desde que aplicás el sistémico hasta que podés cosechar fruta segura para consumir (el Período de Carencia)."
                      </p>
                    </div>

                    <a
                      id="buy-scale-chemical"
                      href="https://meli.la/1qVsSGS"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Insecticida Sistémico Glacoxan D-Sist")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Ver Insecticida Sistémico Glacoxan D-Sist
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* RAMA 3: CARACOLES Y BABOSAS */}
            {treeStep === "snails" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: CARACOLES & BABOSAS</span>
                </div>

                <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl text-xs flex gap-2 text-sky-900 font-semibold shadow-sm">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  Diagnóstico: Moluscos devoradores nocturnos.
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm space-y-3">
                  <p className="font-bold text-slate-800">Respuesta Experta:</p>
                  <p className="text-slate-600 leading-relaxed">
                    "Los caracoles y las babosas atacan de noche o en días de mucha humedad, y si los dejás libres, te liquidan los brotes tiernos en horas. Los venenos líquidos comunes no les hacen nada porque tienen una capa protectora de mucosa. 
                    <strong>Tenés que usar Cebos en Pellets (Molusquicidas).</strong> Los cebos los atraen por su olor de lo imantan, lo comen y se deshidratan rápidamente."
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Tip del Agrónomo:</strong> "Poné los granitos en pequeños montoncitos en las zonas más oscuras, húmedas y con hojarasca del jardín al caer la tarde. No los desparrames al voleo por todo el pasto que se lavan rápido. Si tenés perros, ponelos adentro de una tapita de plástico al revés o bajo una teja para que ellos no los alcancen pero los caracoles sí."
                  </p>
                </div>

                <a
                  id="buy-snails-chemical"
                  href="https://meli.la/1qzRDpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerPurchaseSim("Babosil Cebo Pellets")}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Comprar Babosil Cebo Pellets
                </a>
              </div>
            )}

            {/* RAMA 4: MALEZAS Y YUYOS */}
            {treeStep === "weeds" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: GUERRA A LOS YUYOS</span>
                </div>

                {weedsSubStep === "question" && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-3 text-sm">
                      <span className="text-2xl">🧔🌾</span>
                      <div>
                        <p className="font-bold text-slate-800">Pregunta del Agrónomo:</p>
                        <p className="text-slate-650 font-serif italic text-base">"¿Querés limpiar una vereda/tierra donde no querés que quede nada verde, o querés sacar los yuyos del pasto sin matar el césped?"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        id="weeds-total-btn"
                        onClick={() => setWeedsSubStep("total")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🧱</span>
                        <span className="block font-bold text-slate-800 text-sm">Limpiar vereda/tierra</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Acabar con absolutamente todo lo verde que asoma entre baldosas o pedregal.</span>
                      </button>

                      <button
                        id="weeds-selective-btn"
                        onClick={() => setWeedsSubStep("selective")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🌱</span>
                        <span className="block font-bold text-slate-800 text-sm">Sacar yuyos del pasto</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Matar trébol, diente de león o yuyo sapo sin arruinar el césped común.</span>
                      </button>
                    </div>
                  </div>
                )}

                {weedsSubStep === "total" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex gap-2 text-all-red font-semibold text-amber-950 shadow-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      Tratamiento Fitosanitario: Herbicida TOTAL (Glifosato).
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm">
                      <p className="font-bold text-slate-800 mb-1">Explicación Técnica:</p>
                      <p className="text-slate-650 leading-relaxed">
                        "El herbicida total actúa por absorción foliar: mata todo lo que sea verde. Entra por la hoja hasta congelar la fotosíntesis general de las malezas. Idealmente se tira con sol directo para acelerar el proceso. Usalo exclusivamente en áreas muertas sin pasto alrededor."
                      </p>
                    </div>

                    <a
                      id="buy-weed-total"
                      href="https://meli.la/1ERBf32"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Herbicida Total Glifosato")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Conseguir Herbicida Total (Glifosato)
                    </a>
                  </div>
                )}

                {weedsSubStep === "selective" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs flex gap-2 text-emerald-950 font-semibold shadow-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      Tratamiento Fitosanitario: Herbicida Selectivo (para Hoja Ancha).
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm">
                      <p className="font-bold text-slate-800 mb-1">Explicación Técnica:</p>
                      <p className="text-slate-650 leading-relaxed">
                        "Mata el trébol y el yuyo sapo de raíz mediante un inhibidor hormonal específico que afecta exclusivamente a plantas de crecimiento dicotiledóneo, pero a tu césped tradicional (monocotiledóneo) no le hace absolutamente nada de daño. Se pulveriza disuelto con agua a la tardecita."
                      </p>
                    </div>

                    <a
                      id="buy-weed-selective"
                      href="https://meli.la/1ZMezBK"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Herbicida Selectivo Hoja Ancha")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar Herbicida Selectivo (Hoja Ancha)
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* RAMA 5: APLICACION EFICIENTE / FUMIGACION */}
            {treeStep === "spray" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: HERRAMIENTAS DE PULVERIZACIÓN</span>
                </div>

                {spraySubStep === "question" && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-3 text-sm">
                      <span className="text-2xl">🧔🌾</span>
                      <div>
                        <p className="font-bold text-slate-800">Pregunta del Agrónomo:</p>
                        <p className="text-slate-650 font-serif italic text-base">"¿Qué superficie tenés que cubrir en tu combate? ¿Un balcón/patio chico o un parque grande?"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        id="spray-small-btn"
                        onClick={() => setSpraySubStep("small")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🪴</span>
                        <span className="block font-bold text-slate-800 text-sm">Balcón / Patio chico</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Superficie reducida, plantas en macetas, huerta familiar de verduras o canteros chicos.</span>
                      </button>

                      <button
                        id="spray-large-btn"
                        onClick={() => setSpraySubStep("large")}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <span className="block text-xl mb-1">🌳</span>
                        <span className="block font-bold text-slate-800 text-sm">Parque grande / Fondo</span>
                        <span className="block text-[11px] text-slate-500 mt-1">Un fondo campestre extenso, quintas grandes o céped amplio que cansa la mano.</span>
                      </button>
                    </div>
                  </div>
                )}

                {spraySubStep === "small" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs flex gap-2 text-teal-900 font-semibold shadow-sm">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      Presupuesto Ajustado: Pulverizador Manual de Compresión Previa.
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm">
                      <p className="font-bold text-slate-800 mb-1">Respuesta Experta:</p>
                      <p className="text-slate-650 leading-relaxed font-sans">
                        "Con un pulverizador de presión previa de 1.5 a 2 litros estás sobrado, che. Le das bombeo con el émbolo superior, inflás el bidón y después gatillás una sola vez para que tire una niebla ultra fina constante. No te cansa la mano nada que ver con el limpiador de vidrios tradicional."
                      </p>
                    </div>

                    <a
                      id="buy-spray-manual"
                      href="https://meli.la/2uVe6hR"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Pulverizador Manual de 2L")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar Pulverizador Manual de 2L
                    </a>
                  </div>
                )}

                {spraySubStep === "large" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl text-xs flex gap-2 text-indigo-900 font-semibold shadow-sm">
                      <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      Recomendación Profesional: Mochila de Pulverización Continua.
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm">
                      <p className="font-bold text-slate-800 mb-1">Respuesta Experta:</p>
                      <p className="text-slate-650 leading-relaxed">
                        "Te conviene mil veces una mochila de 12 a 16 litros para colgártela y no acalambrarte la mano dándole al gatillo. Llevás el peso bien repartido en hombros, bombeás con la palanca lateral izquierda de forma relajada y con la lanza dirigís la niebla directo a las hojas o raíces."
                      </p>
                    </div>

                    <a
                      id="buy-spray-backpack"
                      href="https://meli.la/1Van19i"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerPurchaseSim("Mochila de Pulverización")}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar Mochila de Pulverización
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* RAMA 6: CUCARACHAS Y PLAGAS DEL HOGAR */}
            {treeStep === "roaches" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <button onClick={resetTree} className="text-xs font-bold text-slate-550 hover:text-emerald-800 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Volver al Inicio
                  </button>
                  <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold">RAMA: PLAGAS HOGAREÑAS</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex gap-2 text-amber-900 font-semibold shadow-sm">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  Diagnóstico: Cucarachas domésticas (cocinas, grietas o cañerías).
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm space-y-3">
                  <p className="font-bold text-slate-800">Respuesta Experta:</p>
                  <p className="text-slate-650 leading-relaxed">
                    "Las cucarachas son bichos duros de pelar, che. Si andás pulverizando veneno líquido común por la cocina, no les hacés nada, solo las espantás un par de días y te mandás la macana de contaminar platos y mesitas. 
                    <strong>La posta absoluta para exterminar el nido entero es el Gel Mata Cucarachas profesional.</strong> Es un cebo con jeringa dosificadora que les encanta como comida: lo comen, vuelven al nido, se mueren allá y por la propia conducta de ellas desinfectan la colonia completa de raíz."
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Tip del Agrónomo:</strong> "Colocá gotitas del tamaño de una lenteja cerca de motores de heladeras, bisagras de alacenas y abajo de la mesada de cocina. Nunca tires insecticidas aerosol cerca de donde pusiste el gel, porque el olor químico las ahuyenta y no van a querer comer el cebo."
                  </p>
                </div>

                <a
                  id="buy-roaches-gel"
                  href="https://meli.la/2QkR5eG"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerPurchaseSim("Gel Mata Cucarachas")}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-xl transition shadow text-center"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Comprar Gel Mata Cucarachas
                </a>
              </div>
            )}

            {/* Simulated purchase success banner */}
            {purchaseSuccess && (
              <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white border border-emerald-700 py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-sm">
                <div className="bg-emerald-800 p-2 rounded-xl text-emerald-400">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-emerald-300 font-bold uppercase">Mercado Libre Enlace Directo</p>
                  <p className="text-xs text-slate-100 font-sans mt-0.5">Te redireccionamos a Mercado Libre para conseguir <strong>{purchaseSuccess}</strong>.</p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: AI TEXT FREE CHAT */}
        {activeTab === "chat" && (
          <div className="flex flex-col justify-between h-full">
            
            {/* Messages container list */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin select-none max-h-[400px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="text-lg select-none shrink-0">🧔</span>
                    )}
                    <div className="space-y-1.5 whitespace-pre-line font-sans">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] rounded-2xl p-4 bg-slate-100 text-slate-850 rounded-bl-none border border-slate-200/60 items-center">
                    <span className="text-lg select-none">🧔</span>
                    <span className="text-xs font-serif italic text-slate-500 animate-pulse flex items-center gap-1.5">
                      El Ingeniero Agrónomo está analizando las hojas... 🌿💭
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input line helper */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t pt-3 border-slate-200 bg-white">
              <input
                id="ai-chat-input-field"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu consulta (Ej: Hormigas, cochinillas, yuyos)..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 disabled:opacity-50"
              />
              <button
                id="ai-send-message-btn"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-emerald-950 hover:bg-emerald-900 text-white p-3 rounded-xl disabled:opacity-50 transition shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>

      {/* Footer Disclaimer Info */}
      <div className="bg-slate-100 border-t border-slate-205 py-3 px-6 text-[10px] text-slate-400 font-mono text-center flex flex-wrap justify-between items-center gap-2">
        <span>🤖 SISTEMA DESARROLLADO PARA SOLUCIONESHOBBISTA</span>
        <span>PROMPT: INGENIERO ARGENTINO ACTIVO</span>
      </div>
    </div>
  );
}
