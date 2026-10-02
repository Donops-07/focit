import { useState } from "react";
import { User } from "lucide-react";

export function ProfileCard({ name, subtitle, image, imageSrcSet, imageSizes = "(max-width: 639px) 85vw, (max-width: 1023px) 45vw, (max-width: 1279px) 30vw, 24vw", imagePosition = "object-cover object-top", badge, children, variant = "default", isAssistant, initials = "", lazy = true }) {
  const [imgStatus, setImgStatus] = useState("loading"); // loading, loaded, error

  let frameClasses = "bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 w-full ";
  
  if (variant === "president") {
    frameClasses += "student-frame shadow-[0_8px_30px_rgba(251,191,36,0.4)] transform hover:-translate-y-1 relative z-10";
  } else if (variant === "vice-president") {
    frameClasses += "border-2 border-slate-300 shadow-md hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-1 relative z-10";
  } else if (variant === "dean-frame") {
    frameClasses += "dean-frame shadow-xl transform hover:-translate-y-1 relative z-10";
  } else if (variant === "student-frame") {
    frameClasses += "student-frame shadow-xl transform hover:-translate-y-1 relative z-10";
  } else if (isAssistant) {
    frameClasses += "border border-slate-200 shadow-sm hover:shadow-md relative bg-slate-50 opacity-90 hover:opacity-100";
  } else {
    frameClasses += "border border-slate-200 shadow-sm hover:shadow-md relative";
  }

  return (
    <div className={frameClasses}>
      <div className="aspect-[4/5] sm:aspect-square w-full bg-slate-100 relative flex items-center justify-center overflow-hidden">
        {imgStatus !== 'error' && (
          <img 
            src={image || "invalid-trigger-error"} 
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? imageSizes : undefined}
            alt={`Profile of ${name}`} 
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
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

      </div>
    </div>
  );
}
