export function ProfileCard({ name, subtitle, image, imagePosition = "object-cover object-top", badge, children, variant = "default", assistant }) {
  
  let frameClasses = "bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 ";
  
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

  // Common function to render a profile slide
  const renderSlide = (slideName, slideSubtitle, slideImage, isAssistant = false) => (
    <div className="w-full flex-shrink-0 snap-center flex flex-col h-full relative">
      <div className="aspect-[4/5] sm:aspect-square w-full bg-slate-100 relative">
        <img 
          src={slideImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"} 
          alt={slideName} 
          className={`absolute inset-0 w-full h-full ${imagePosition}`}
        />
        {assistant && !isAssistant && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 shadow-sm border border-white/50 flex items-center gap-1">
            Swipe <span className="text-indigo-500">→</span>
          </div>
        )}
        {isAssistant && (
          <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
            Assistant
          </div>
        )}
      </div>
      <div className={`p-6 flex-grow flex flex-col ${isAssistant ? 'bg-slate-50' : 'bg-white'}`}>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{slideName}</h3>
        <p className="text-indigo-600 font-medium text-sm mb-3">{slideSubtitle}</p>
        
        {!isAssistant && children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        <div className="mt-auto">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isAssistant ? 'bg-slate-200 text-slate-700' : (badge ? `bg-${badge.color}-100 text-${badge.color}-800` : 'bg-slate-100 text-slate-800')}`}>
            {isAssistant ? (assistant.department?.name || assistant.department || badge?.name || "Faculty Member") : (badge?.name || badge)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={frameClasses}>
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {renderSlide(name, subtitle, image, false)}
        {assistant && renderSlide(assistant.name, assistant.role || `Assistant ${subtitle}`, assistant.photo, true)}
      </div>
      
      {/* Scroll Indicators */}
      {assistant && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
