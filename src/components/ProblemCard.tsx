import React from "react";
import { GuideBlock } from "../data/guides";
import { 
  AntSimulator, 
  CockroachKitchenMap, 
  SprayerSelector, 
  WeedSimulator,
  SnailSimulator,
  ScaleInsectSimulator
} from "./InteractiveAssistants";
import { 
  CheckCircle, AlertTriangle, Sparkles, Settings 
} from "lucide-react";

interface ProblemCardProps {
  key?: string;
  block: GuideBlock;
}

export default function ProblemCard({ block }: ProblemCardProps) {
  
  const renderInteractiveSection = () => {
    switch (block.id) {
      case "hormigas":
        return <AntSimulator />;
      case "cucarachas":
        return <CockroachKitchenMap />;
      case "pulverizadores":
        return <SprayerSelector />;
      case "guerra-yuyos":
        return <WeedSimulator />;
      case "caracoles":
        return <SnailSimulator />;
      case "cochinillas":
        return <ScaleInsectSimulator />;
      default:
        return null;
    }
  };

  return (
    <div 
      id={`guide-card-${block.id}`} 
      className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm transition hover:shadow-md hover:border-slate-300 relative overflow-hidden font-sans text-slate-800"
    >
      {/* Absolute category badge */}
      <div className="absolute top-6 right-6 font-mono text-xs text-slate-400 bg-slate-200/50 py-1 px-3 rounded-full font-semibold">
        {block.category}
      </div>

      <div className="max-w-3xl">
        {/* Top block metadata */}
        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200/50 mb-4 tracking-wide">
          {block.badge}
        </span>

        {/* Title */}
        <h3 id={`title-${block.id}`} className="text-xl md:text-2xl font-sans font-bold text-slate-900 leading-snug mb-4">
          {block.title}
        </h3>

        {/* Content Intro */}
        <p className="text-slate-750 text-slate-705 text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-sans whitespace-pre-wrap">
          {block.intro}
        </p>

        {/* Golden Rule / Solution Banner */}
        <div className="bg-white border border-emerald-150 rounded-2xl p-5 mb-6 shadow-xs">
          <h4 className="font-sans font-bold text-emerald-950 text-sm md:text-base flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            {block.solutionTitle}
          </h4>
          <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-sans whitespace-pre-wrap">
            {block.solutionText}
          </p>
        </div>

        {/* Sub-block content: Warning, list of locations, comparison */}
        {(block.errorTitle || block.errorText) && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-6">
            <h4 className="font-sans font-bold text-amber-900 text-sm md:text-base flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              {block.errorTitle}
            </h4>
            <div className="text-slate-700 text-xs md:text-sm leading-relaxed font-sans whitespace-pre-line">
              {block.errorText}
            </div>
          </div>
        )}

        {/* Types rendering for Pulverizadores or Herbicidas */}
        {block.typesInfo && (
          <div className="space-y-4 mb-6">
            {block.typesInfo.map((type, index) => (
              <div key={index} className="bg-white border border-slate-200 p-4 rounded-xl">
                <h5 className="font-bold text-slate-950 text-xs md:text-sm mb-1">{type.name}</h5>
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-sans mb-2 whitespace-pre-wrap">{type.desc}</p>
                <span className="inline-block font-mono text-[10px] bg-slate-100 text-slate-600 py-0.5 px-2 rounded">
                  {type.suitability}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Maintenance / Tip footer */}
        {block.maintenanceTitle && (
          <div className="bg-blue-50/65 border border-blue-200 rounded-xl p-4 mb-6">
            <h5 className="font-sans font-bold text-blue-900 text-xs md:text-sm mb-1 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-blue-600" />
              {block.maintenanceTitle}
            </h5>
            <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-sans">{block.maintenanceText}</p>
          </div>
        )}

        {/* Safe ocular warning alert */}
        {block.warningAlert && (
          <div className="bg-orange-50/80 border border-orange-200 text-orange-950 text-xs p-4 rounded-xl mb-6 flex items-start gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-orange-600 flex-shrink-0 mt-0.5" />
            <span className="font-sans">{block.warningAlert}</span>
          </div>
        )}

        {/* Emit Specific Interactive Assistant */}
        <div className="my-8 border-t border-dashed border-slate-300 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1 rounded bg-amber-100 text-amber-700 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              Asistente Interactivo Incluido:
            </span>
          </div>
          {renderInteractiveSection()}
        </div>

      </div>
    </div>
  );
}
