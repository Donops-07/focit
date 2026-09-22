export function ProfileCard({ name, subtitle, image, badge, children, variant = "default" }) {
  
  let frameClasses = "bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 ";
  
  if (variant === "president") {
    frameClasses += "border-2 border-amber-400 shadow-[0_4px_20px_rgba(251,191,36,0.25)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.4)] transform hover:-translate-y-1 relative z-10";
  } else if (variant === "vice-president") {
    frameClasses += "border-2 border-slate-300 shadow-md hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-1 relative z-10";
  } else {
    frameClasses += "border border-slate-200 shadow-sm hover:shadow-md";
  }

  return (
    <div className={frameClasses}>
      <div className="h-48 w-full bg-slate-100 relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-indigo-600 font-medium text-sm mb-3">{subtitle}</p>
        
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        {badge && (
          <div className="mt-auto">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${badge.color}-100 text-${badge.color}-800`}>
              {badge.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
