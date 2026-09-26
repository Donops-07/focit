import { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';

const CustomTooltip = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  isLastStep,
}) => (
  <div 
    {...tooltipProps} 
    className="bg-[#0a1142]/90 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.2)] rounded-xl p-6 max-w-sm text-white font-sans transition-all"
  >
    {step.title && (
      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400 font-heading">
        {step.title}
      </h3>
    )}
    <div className="text-slate-300 text-sm leading-relaxed mb-6">
      {step.content}
    </div>
    
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
      <div className="text-xs text-slate-500 font-mono font-bold">
        {index + 1} / {step.totalSteps || 5}
      </div>
      <div className="flex gap-2">
        {index > 0 && (
          <button 
            {...backProps} 
            className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Back
          </button>
        )}
        <button 
          {...primaryProps} 
          className="px-4 py-1.5 text-sm font-bold bg-[#FFB81C] text-[#070c2e] rounded-md hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(255,184,28,0.5)] transition-all"
        >
          {isLastStep ? 'Finish Tour' : 'Next'}
        </button>
      </div>
    </div>
    <button 
      {...skipProps} 
      className="absolute top-3 right-3 text-slate-500 hover:text-white text-xs font-medium px-2 py-1"
    >
      Skip
    </button>
  </div>
);

export default function Tutorial() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const isFirstTime = localStorage.getItem('focitsa_tutorial_completed') !== 'true';
    if (isFirstTime) {
      setTimeout(() => {
        setRun(true);
        // Mark as completed immediately to prevent re-triggering on refresh
        localStorage.setItem('focitsa_tutorial_completed', 'true');
      }, 1000);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, action } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || action === 'close') {
      setRun(false);
    }
  };

  const steps = [
    {
      target: 'body',
      placement: 'center',
      title: 'Welcome, FOCIT Techie! 🚀',
      content: 'We have completely revamped our digital campus. Let\'s take a quick 30-second tour of your new tech hub.',
      disableBeacon: true,
      totalSteps: 5
    },
    {
      target: '.main-nav',
      content: 'This is your central command. Hover over this area to reveal our mega-menu with instant access to all departments and portals.',
      totalSteps: 5
    },
    {
      target: '#hero-section',
      content: 'Access the Admissions Portal or start exploring the faculty directly from here.',
      placement: 'bottom',
      totalSteps: 5
    },
    {
      target: '#bento-grid',
      content: 'Discover our advanced infrastructure, research repository, and alumni network in this structured tech grid.',
      placement: 'top',
      totalSteps: 5
    },
    {
      target: '#analytics-dashboard',
      content: 'Monitor live faculty traffic and engagement metrics right here on the terminal dashboard.',
      placement: 'top',
      totalSteps: 5
    }
  ];

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      steps={steps}
      tooltipComponent={CustomTooltip}
      floaterProps={{
        disableAnimation: false,
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
}
