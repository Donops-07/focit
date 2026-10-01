import { useState } from "react";
import { ChevronDown, User } from "lucide-react";

export function ProfileCard({ name, subtitle, image, imagePosition = "object-cover object-top", badge, children, variant = "default", assistant, initials = "" }) {
  const [imgStatus, setImgStatus] = useState("loading"); // loading, loaded, error
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);

  let frameClasses = "bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 w-full ";
  
  if (variant === "president") {
    frameClasses += "student-frame shadow-[0_8px_30px_rgba(251,191,36,0.4)] transform hover:-translate-y-1 relative z-10";
  } else if (variant === "vice-president") {
    frameClasses += "border-2 border-slate-300 shadow-md hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-1 relative z-10";
  } else if (variant === "dean-frame") {
    frameClasses += "dean-frame shadow-xl transform hover:-translate-y-1 relative z-10";
  } else if (variant === "student-frame") {
    frameClasses += "student-frame shadow-xl transform hover:-translate-y-1 relative z-10";
  } else {
    frameClasses += "border border-slate-200 shadow-sm hover:shadow-md relative";
  }

  return (
    <div className={frameClasses}>
      <div className="aspect-[4/5] sm:aspect-square w-full bg-slate-100 relative flex items-center justify-center overflow-hidden">
        {imgStatus !== 'error' && (
          <img 
            src={image || "invalid-trigger-error"} 
            alt={`Profile of ${name}`} 
            onLoad={() => setImgStatus("loaded")}
            onError={() => setImgStatus("error")}
            className={`absolute inset-0 w-full h-full ${imagePosition} ${imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          />
        )}
        {imgStatus !== 'loaded' && (
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-50">
            <span className="text-4xl font-bold text-indigo-300 tracking-wider select-none">
              {initials || <User className="w-12 h-12 text-indigo-200" />}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex-grow flex flex-col bg-white">
        <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{name}</h3>
        <p className="text-indigo-600 font-medium text-sm mb-3">{subtitle}</p>
        
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        <div className="mt-auto pt-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badge ? `bg-slate-50 text-slate-700 border-slate-200` : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
            {badge?.name || badge}
          </span>
        </div>

        {assistant && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setIsAssistantExpanded(!isAssistantExpanded)}
              aria-expanded={isAssistantExpanded}
              aria-controls={`assistant-${name.replace(/\s+/g, '-')}`}
              className="flex items-center justify-between w-full text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 -mx-1 py-1"
            >
              <span>View Assistant</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isAssistantExpanded ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>
            
            <div 
              id={`assistant-${name.replace(/\s+/g, '-')}`}
              className={`grid transition-all duration-300 ease-in-out ${isAssistantExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 visible' : 'grid-rows-[0fr] opacity-0 mt-0 invisible'}`}
              aria-hidden={!isAssistantExpanded}
              inert={!isAssistantExpanded ? "" : undefined}
            >
              <div className="overflow-hidden">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-300">
                     {assistant.photo ? (
                        <img 
                          src={assistant.photo} 
                          alt={assistant.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                     ) : null}
                     <span className="text-xs font-bold text-slate-500" style={{display: assistant.photo ? 'none' : 'flex'}}>{assistant.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{assistant.name}</p>
                    <p className="text-xs text-slate-500 truncate">{assistant.role || 'Assistant'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
