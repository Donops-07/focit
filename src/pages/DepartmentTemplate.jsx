import React, { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import { getDepartmentBasic, getDepartmentStaff, getRollOfHonour } from "../services/api";
import { ChevronRight, Users, BookOpen, FlaskConical, Award, X, ExternalLink } from "lucide-react";
import { ProfileCard } from "../components/ui/ProfileCard";
import { cn } from "../lib/utils";

// No external hero image assets needed; using inline SVG for zero-payload LCP

// ============================================================================
// LOADER & DEFERRED DATA
// ============================================================================

export async function departmentLoader({ params, request }) {
  // Await the critical path basic data for instant FCP
  const department = await getDepartmentBasic(params.slug, {
    signal: request.signal,
  });

  if (!department) {
    throw new Response("Department not found", { status: 404 });
  }

  // Do NOT await the slow relational join, pass the promise directly for streaming
  const staffPromise = getDepartmentStaff(params.slug, {
    limit: 8,
    signal: request.signal,
  });

  const rollOfHonourPromise = getRollOfHonour({ level: "department", departmentId: department.id }, {
    signal: request.signal,
  });

  // RR v7 removed defer(). Returning a plain object with an unresolved
  // promise is enough — the framework auto-detects it and streams to <Await>.
  return {
    department,
    staffPromise,
    rollOfHonourPromise,
  };
}

// ============================================================================
// COMPOSABLE SUB-COMPONENTS
// ============================================================================

// Injected keyframe styles for SVG animations
const SVG_STYLES = `
  @keyframes dash-draw { to { stroke-dashoffset: 0; } }
  @keyframes pulse-node { 0%,100%{r:6;opacity:.8} 50%{r:10;opacity:1} }
  @keyframes pulse-node-lg { 0%,100%{r:10;opacity:.7} 50%{r:16;opacity:1} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
  @keyframes float-up { 0%{transform:translateY(0);opacity:.6} 50%{opacity:1} 100%{transform:translateY(-20px);opacity:0} }
  @keyframes blink { 0%,100%{opacity:.2} 50%{opacity:1} }
  @keyframes scan-line { 0%{transform:translateY(0)} 100%{transform:translateY(180px)} }
  @keyframes bar-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  @keyframes ripple { 0%{r:20;opacity:.8} 100%{r:80;opacity:0} }
  .anim-draw { stroke-dasharray:1000; stroke-dashoffset:1000; animation:dash-draw 2.5s ease forwards; }
  .anim-draw-2 { stroke-dasharray:600; stroke-dashoffset:600; animation:dash-draw 2s ease .4s forwards; }
  .anim-draw-3 { stroke-dasharray:400; stroke-dashoffset:400; animation:dash-draw 1.8s ease .8s forwards; }
  .pulse-sm { animation:pulse-node 2.4s ease-in-out infinite; }
  .pulse-lg { animation:pulse-node-lg 2s ease-in-out infinite; }
  .spin-cw { transform-origin:200px 200px; animation:spin-slow 12s linear infinite; }
  .spin-ccw { transform-origin:200px 200px; animation:spin-reverse 8s linear infinite; }
`;

function DepartmentGraphic({ slug }) {
  return (
    <>
      <style>{SVG_STYLES}</style>
      {(() => {
        switch(slug) {
          /* ── CYBER SECURITY ─────────────────── red */
          case 'cyber-security':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer shield */}
                <path className="anim-draw" d="M200,40 L320,90 L320,200 C320,285 268,345 200,382 C132,345 80,285 80,200 L80,90 Z"
                  stroke="#f87171" strokeWidth="2" opacity="0.6"/>
                {/* Inner shield */}
                <path className="anim-draw-2" d="M200,75 L295,115 L295,200 C295,265 253,315 200,348 C147,315 105,265 105,200 L105,115 Z"
                  stroke="#f87171" strokeWidth="1" opacity="0.3"/>
                {/* Lock body */}
                <rect className="anim-draw-3" x="152" y="170" width="96" height="84" rx="8"
                  stroke="#f87171" strokeWidth="2" opacity="0.8"/>
                {/* Lock shackle */}
                <path className="anim-draw-3" d="M168,170 L168,138 C168,112 232,112 232,138 L232,170"
                  stroke="#f87171" strokeWidth="2" opacity="0.8"/>
                {/* Glowing keyhole */}
                <circle cx="200" cy="208" r="8" fill="#f87171">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <rect x="197" y="216" width="6" height="18" rx="2" fill="#f87171" opacity="0.9"/>
                {/* Orbiting ring */}
                <ellipse cx="200" cy="200" rx="155" ry="155" stroke="#f87171" strokeWidth="0.5"
                  strokeDasharray="8 12" opacity="0.2" className="spin-cw"/>
                {/* Scanning line */}
                <line x1="80" y1="90" x2="320" y2="90" stroke="#f87171" strokeWidth="1" opacity="0.4">
                  <animateTransform attributeName="transform" type="translate" values="0,0;0,200;0,0" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
                </line>
                {/* Corner nodes */}
                {[[80,90],[320,90],[200,382]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#f87171">
                    <animate attributeName="opacity" values="1;0.2;1" dur={`${1.6+i*0.4}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
                {/* Floating particles */}
                {[70,130,250,330].map((cx,i) => (
                  <circle key={i} cx={cx} cy={300-i*20} r="2" fill="#fca5a5" opacity="0.6">
                    <animate attributeName="cy" values={`${300-i*20};${260-i*20};${300-i*20}`} dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
              </svg>
            );

          /* ── COMPUTER SCIENCE ────────────────── blue */
          case 'computer-science':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Monitor frame */}
                <rect className="anim-draw" x="55" y="72" width="290" height="196" rx="12"
                  stroke="#60a5fa" strokeWidth="2" opacity="0.7"/>
                {/* Screen divider */}
                <line className="anim-draw-2" x1="55" y1="224" x2="345" y2="224" stroke="#60a5fa" strokeWidth="2" opacity="0.6"/>
                {/* Stand */}
                <path className="anim-draw-3" d="M160,320 L240,320 M200,268 L200,320" stroke="#60a5fa" strokeWidth="3" opacity="0.7"/>
                {/* Code lines — animate sequentially */}
                {[
                  {x1:82,y1:112,x2:162,y2:112,w:3,d:"0s"},
                  {x1:82,y1:136,x2:218,y2:136,w:3,d:"0.2s"},
                  {x1:82,y1:160,x2:140,y2:160,w:3,d:"0.4s"},
                  {x1:152,y1:160,x2:202,y2:160,w:3,d:"0.6s"},
                  {x1:82,y1:184,x2:178,y2:184,w:3,d:"0.8s"},
                  {x1:190,y1:184,x2:280,y2:184,w:3,d:"1.0s"},
                  {x1:82,y1:208,x2:120,y2:208,w:3,d:"1.2s"},
                ].map(({x1,y1,x2,y2,w,d},i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth={w}
                    strokeDasharray="200" strokeDashoffset="200" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.8s" begin={d} fill="freeze"/>
                  </line>
                ))}
                {/* Blinking cursor */}
                <rect x="128" y="204" width="8" height="12" fill="#60a5fa">
                  <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
                </rect>
                {/* Taskbar dots */}
                {[75,97,119].map((cx,i) => (
                  <circle key={i} cx={cx} cy={244} r="5" fill="#60a5fa">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
                {/* Glowing focal circle */}
                <circle cx="310" cy="148" r="12" fill="#60a5fa" opacity="0.2">
                  <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="310" cy="148" r="6" fill="#60a5fa">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            );

          /* ── SOFTWARE ENGINEERING ────────────── purple */
          case 'software-engineering':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Hexagonal structure */}
                <path className="anim-draw" d="M200,50 L330,125 L330,275 L200,350 L70,275 L70,125 Z"
                  stroke="#c084fc" strokeWidth="1.5" opacity="0.4"/>
                <path className="anim-draw-2" d="M200,100 L290,150 L290,250 L200,300 L110,250 L110,150 Z"
                  stroke="#c084fc" strokeWidth="1.5" opacity="0.5"/>
                {/* Spokes */}
                {[[200,50],[330,125],[330,275],[200,350],[70,275],[70,125]].map(([x,y],i) => (
                  <line key={i} x1={x} y1={y} x2="200" y2="200" stroke="#c084fc" strokeWidth="1"
                    opacity="0.2" strokeDasharray="3 4"/>
                ))}
                {/* Center hub */}
                <circle cx="200" cy="200" r="24" fill="#c084fc" opacity="0.15">
                  <animate attributeName="r" values="24;36;24" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="200" r="14" fill="#c084fc">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                {/* Node pulsing on each vertex */}
                {[[200,50],[330,125],[330,275],[200,350],[70,275],[70,125]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="8" fill="#c084fc">
                    <animate attributeName="r" values="8;12;8" dur={`${1.8+i*0.25}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.8+i*0.25}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
                {/* Outer orbit ring */}
                <circle cx="200" cy="200" r="155" stroke="#c084fc" strokeWidth="0.5"
                  strokeDasharray="6 14" opacity="0.15" className="spin-cw"/>
                {/* Git-branch connector above */}
                <rect x="180" y="18" width="40" height="26" rx="5" fill="#c084fc" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
                </rect>
                <path d="M200,44 L200,50" stroke="#c084fc" strokeWidth="2" opacity="0.7"/>
              </svg>
            );

          /* ── INFORMATION SYSTEMS ─────────────── amber */
          case 'information-systems':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Three database cylinders (stacked ellipses) */}
                {[80, 160, 240].map((cy, i) => (
                  <g key={i}>
                    <ellipse cx="200" cy={cy} rx="90" ry="28" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
                    </ellipse>
                    {i < 2 && (
                      <>
                        <line x1="110" y1={cy} x2="110" y2={cy+80} stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="290" y1={cy} x2="290" y2={cy+80} stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/>
                      </>
                    )}
                  </g>
                ))}
                {/* Animated data flow lines */}
                {[
                  {x1:40, y1:160, x2:110, y2:160},
                  {x1:290, y1:240, x2:360, y2:240},
                  {x1:200, y1:268, x2:200, y2:340},
                ].map(({x1,y1,x2,y2},i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2"
                    strokeDasharray="6 6" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" values="0;-24" dur="1s" repeatCount="indefinite"/>
                  </line>
                ))}
                {/* Terminal nodes */}
                {[[40,160],[360,240],[200,340]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="7" fill="#fbbf24">
                    <animate attributeName="r" values="7;11;7" dur={`${1.6+i*0.5}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.4;1" dur={`${1.6+i*0.5}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
                {/* Floating data packets along the lines */}
                <circle r="5" fill="#fde68a">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M40,160 L110,160"/>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle r="5" fill="#fde68a">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M290,240 L360,240"/>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              </svg>
            );

          /* ── INFORMATION TECHNOLOGY ──────────── teal */
          case 'information-technology':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric dashed orbit rings */}
                <circle cx="200" cy="200" r="145" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="10 10"
                  opacity="0.2" className="spin-cw"/>
                <circle cx="200" cy="200" r="100" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="6 8"
                  opacity="0.3" className="spin-ccw"/>
                <circle cx="200" cy="200" r="55" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 6"
                  opacity="0.4" className="spin-cw"/>
                {/* Axes */}
                <line className="anim-draw" x1="200" y1="52" x2="200" y2="348" stroke="#2dd4bf" strokeWidth="1" opacity="0.2"/>
                <line className="anim-draw" x1="52" y1="200" x2="348" y2="200" stroke="#2dd4bf" strokeWidth="1" opacity="0.2"/>
                <line className="anim-draw-2" x1="97" y1="97" x2="303" y2="303" stroke="#2dd4bf" strokeWidth="1" opacity="0.15"/>
                <line className="anim-draw-2" x1="303" y1="97" x2="97" y2="303" stroke="#2dd4bf" strokeWidth="1" opacity="0.15"/>
                {/* Central hub */}
                <circle cx="200" cy="200" r="28" fill="#2dd4bf" opacity="0.12">
                  <animate attributeName="r" values="28;44;28" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="200" r="18" fill="#2dd4bf">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                {/* 8 network nodes */}
                {[
                  [200,55],[200,345],[55,200],[345,200],
                  [97,97],[303,303],[97,303],[303,97],
                ].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r={i<4?10:8} fill="#2dd4bf">
                    <animate attributeName="r" values={`${i<4?10:8};${i<4?15:12};${i<4?10:8}`}
                      dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;1;0.7"
                      dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
                {/* Animated packet traveling around the ring */}
                <circle r="6" fill="#99f6e4">
                  <animateMotion dur="4s" repeatCount="indefinite"
                    path="M200,55 A145,145 0 1,1 199.9,55"/>
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="4s" repeatCount="indefinite"/>
                </circle>
              </svg>
            );

          /* ── DATA SCIENCE ────────────────────── indigo */
          case 'data-science':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Axes */}
                <line className="anim-draw" x1="58" y1="342" x2="342" y2="342" stroke="#818cf8" strokeWidth="2" opacity="0.6"/>
                <line className="anim-draw" x1="58" y1="58" x2="58" y2="342" stroke="#818cf8" strokeWidth="2" opacity="0.6"/>
                {/* Grid */}
                {[120,180,240,300].map((v,i) => (
                  <line key={i} x1={v} y1="58" x2={v} y2="342" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.15"/>
                ))}
                {[100,160,220,280].map((v,i) => (
                  <line key={i} x1="58" y1={v} x2="342" y2={v} stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.15"/>
                ))}
                {/* Area fill */}
                <path d="M58,280 L120,196 L180,238 L260,112 L320,156 L320,342 L58,342 Z"
                  fill="#818cf8" opacity="0.08"/>
                {/* Chart line */}
                <path className="anim-draw" d="M58,280 L120,196 L180,238 L260,112 L320,156"
                  stroke="#818cf8" strokeWidth="3" opacity="0.9"/>
                {/* Data point nodes */}
                {[[58,280],[120,196],[180,238],[260,112],[320,156]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r={i===3?10:6} fill="#818cf8">
                    <animate attributeName="r" values={`${i===3?10:6};${i===3?16:10};${i===3?10:6}`}
                      dur={`${1.6+i*0.4}s`} repeatCount="indefinite"/>
                    {i===3 && (
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/>
                    )}
                  </circle>
                ))}
                {/* Peak glow */}
                <circle cx="260" cy="112" r="24" fill="#818cf8" opacity="0.1">
                  <animate attributeName="r" values="24;40;24" dur="2.2s" repeatCount="indefinite"/>
                </circle>
                {/* Animated bar chart in corner */}
                {[[298,30],[318,50],[338,20]].map(([x,h],i) => (
                  <rect key={i} x={x} y={342-h} width="14" height={h} rx="2" fill="#818cf8" opacity="0.4"
                    style={{transformOrigin:`${x+7}px 342px`,animation:`bar-grow 1.2s ease ${i*0.2}s both`}}/>
                ))}
              </svg>
            );

          /* ── LIBRARY & INFORMATION SCIENCE ───── orange */
          case 'library-and-information-science':
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Open book outline */}
                <path className="anim-draw"
                  d="M200,330 C145,330 82,350 60,370 L60,110 C82,90 145,68 200,68 C255,68 318,90 340,110 L340,370 C318,350 255,330 200,330 Z"
                  stroke="#fb923c" strokeWidth="2" opacity="0.65"/>
                {/* Spine */}
                <line className="anim-draw-2" x1="200" y1="68" x2="200" y2="330" stroke="#fb923c" strokeWidth="2.5" opacity="0.7"/>
                {/* Left page lines */}
                {[130,162,194,226,258].map((y,i) => (
                  <path key={i} d={`M82,${y} C118,${y-14} 158,${y-18} 194,${y-18}`}
                    stroke="#fb923c" strokeWidth="1.5" opacity="0.35"
                    strokeDasharray="200" strokeDashoffset="200">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1s" begin={`${0.4+i*0.2}s`} fill="freeze"/>
                  </path>
                ))}
                {/* Right page lines */}
                {[130,162,194,226].map((y,i) => (
                  <path key={i} d={`M318,${y} C282,${y-14} 242,${y-18} 206,${y-18}`}
                    stroke="#fb923c" strokeWidth="1.5" opacity="0.35"
                    strokeDasharray="200" strokeDashoffset="200">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1s" begin={`${0.6+i*0.2}s`} fill="freeze"/>
                  </path>
                ))}
                {/* Glowing orb at top (lamp / knowledge metaphor) */}
                <circle cx="200" cy="44" r="20" fill="#fb923c" opacity="0.15">
                  <animate attributeName="r" values="20;32;20" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="44" r="12" fill="#fb923c">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <line x1="200" y1="64" x2="200" y2="68" stroke="#fb923c" strokeWidth="2.5" opacity="0.8"/>
                {/* Floating knowledge particles */}
                {[130,160,230,270].map((cx,i) => (
                  <circle key={i} cx={cx} cy={300} r="3" fill="#fdba74" opacity="0">
                    <animate attributeName="cy" values={`${300};${260-i*8};${220-i*8}`}
                      dur={`${2.5+i*0.5}s`} begin={`${i*0.6}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.8;0"
                      dur={`${2.5+i*0.5}s`} begin={`${i*0.6}s`} repeatCount="indefinite"/>
                  </circle>
                ))}
              </svg>
            );

          /* ── DEFAULT ─────────────────────────── cyan */
          default:
            return (
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="140" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="8 12" opacity="0.2" className="spin-cw"/>
                {[[200,60],[340,140],[340,260],[200,340],[60,260],[60,140]].map(([x,y],i)=>(
                  <React.Fragment key={i}>
                    <line x1="200" y1="200" x2={x} y2={y} stroke="#22d3ee" strokeWidth="1" opacity="0.25"
                      strokeDasharray="3 5"/>
                    <circle cx={x} cy={y} r="7" fill="#22d3ee">
                      <animate attributeName="r" values="7;11;7" dur={`${1.8+i*0.3}s`} repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.8+i*0.3}s`} repeatCount="indefinite"/>
                    </circle>
                  </React.Fragment>
                ))}
                <circle cx="200" cy="200" r="20" fill="#22d3ee" opacity="0.15">
                  <animate attributeName="r" values="20;32;20" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="200" r="10" fill="#22d3ee">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.4s" repeatCount="indefinite"/>
                </circle>
              </svg>
            );
        }
      })()}
    </>
  );
}

function DepartmentHero({ department }) {
  return (
    <section 
      key={`hero-${department.slug}`}
      className="w-full pt-40 pb-24 md:pt-48 md:pb-32 bg-blue-darker relative overflow-hidden flex flex-col justify-center min-h-[60vh] lg:min-h-[75vh]"
    >
      {/* High-Performance CSS Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#0a1142] to-slate-950"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          
          {/* Text Column - Solid White for Guaranteed Visibility */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            <div className="flex items-center gap-2 text-sm text-cyan-400 font-semibold tracking-wide uppercase drop-shadow-md">
              <Link to="/departments" className="hover:text-cyan-300 transition-colors">Departments</Link>
              <ChevronRight size={14} className="opacity-70" />
              <span aria-current="page">{department.shortName}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Department of <br className="hidden md:block" />
              <span className="text-blue-50">{department.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 font-light leading-relaxed max-w-2xl mt-2 drop-shadow-md">
              {department.vision}
            </p>
          </div>
          
          {/* Scalable SVG Geometric Graphic (Watermark on Mobile, Grid Accent on Desktop) */}
          <div className="absolute lg:relative -inset-10 lg:inset-auto z-0 lg:z-10 opacity-15 lg:opacity-100 lg:col-span-5 flex items-center justify-center pointer-events-none lg:pointer-events-auto overflow-hidden lg:overflow-visible">
            <div className="w-[150%] sm:w-full lg:w-full max-w-2xl mx-auto lg:max-w-none relative group">
              {/* Ambient Blue Glow (Desktop only) */}
              <div className="hidden lg:block absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-400/30 transition-colors duration-700"></div>
              
              <div className="relative aspect-square w-full lg:opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                <DepartmentGraphic slug={department.slug} />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function DepartmentOverview({ department }) {
  return (
    <section key={`overview-${department.slug}`} className="animate-slide-up-fade w-full py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          
          {/* Main Text Content - Internal Typographic Rhythm via flex gap */}
          <div className="md:col-span-2 flex flex-col gap-6 prose prose-lg prose-blue max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
              About the Department
            </h2>
            <p className="text-gray-700 leading-[1.7] text-lg">
              {department.description}
            </p>
            
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-blue-dark pt-6">
              Academic Programmes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {department.programmes.map((prog, idx) => {
                const name = typeof prog === 'string' ? prog : prog.name;
                const handbookUrl = typeof prog === 'string' ? "#" : prog.handbookUrl;
                const reqsUrl = typeof prog === 'string' ? "https://admissions.uniosun.edu.ng" : prog.requirementsUrl;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                    <h4 className="font-bold text-slate-900">{name}</h4>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      <a href={handbookUrl} download className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1">
                        Download Handbook
                      </a>
                      <a href={reqsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1">
                        Entry Requirements <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Quick Stats Sidebar */}
          <div className="bg-surface-alt p-10 md:p-12 rounded-2xl border border-border h-fit shadow-sm">
            <h3 className="text-xl font-bold font-heading text-blue-dark mb-8">Quick Stats</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-blue-lightest text-blue-primary flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">{department.staffCount || 0}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Faculty Members</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-lightest text-purple-dark flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">{department.programmes.length}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Programmes</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <FlaskConical size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">2</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Laboratories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function extractInitials(name) {
  if (!name || typeof name !== 'string') return "";
  let clean = name.replace(/\([^)]*\)/g, "");
  clean = clean.replace(/\b(?:Prof|Dr|Mr|Mrs|Ms|Rt\.\s?Hon|Sen|Comrade|Engr|Arch)\b\.?\s*/gi, "");
  const tokens = clean.trim().split(/\s+/).filter(Boolean);
  const first = tokens[0] ? tokens[0].charAt(0).toUpperCase() : "";
  const second = tokens[1] ? tokens[1].charAt(0).toUpperCase() : "";
  return first + second;
}

function StaffCard({ member, departmentSlug }) {
  const [imgStatus, setImgStatus] = React.useState('loading');
  return (
        <div className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-blue-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <Link to={`/departments/${departmentSlug}/staff/${member.slug}`} className="block relative aspect-square sm:aspect-[4/3] bg-gray-100 overflow-hidden group-hover:bg-blue-50 transition-colors">
            {imgStatus !== 'error' && (
              <img 
                src={member.profileImageUrl || "/default-avatar.jpg"} 
                alt={member.name}
                onLoad={() => setImgStatus('loaded')}
                onError={() => setImgStatus('error')}
                className={cn("absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300", imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0')}
              />
            )}
            {imgStatus !== 'loaded' && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-lightest/50 text-blue-primary text-5xl font-bold group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                {extractInitials(member.name)}
              </div>
            )}
          </Link>
          <div className="p-8 flex flex-col flex-1">
            <Link to={`/departments/${departmentSlug}/staff/${member.slug}`}>
              <h4 className="font-bold text-gray-900 text-xl group-hover:text-blue-primary transition-colors line-clamp-1 mb-2">
                {member.name}
              </h4>
            </Link>
            <p className="text-sm text-blue-primary/80 font-semibold mb-5">{member.title}</p>
            <div className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
              <span className="font-semibold text-gray-700">Interests:</span> {member.researchInterests?.join(", ")}
            </div>
            <a
              href={`https://uniosun.edu.ng/staff/${member.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View official university profile of ${member.name}`}
              className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-primary rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
            >
              See Official Profile
            </a>
          </div>
        </div>
  );
}

function StaffGrid({ staffResponse, departmentSlug, fallbackStaffCount }) {
  // Handle both raw array (mock) or paginated envelope (API)
  const staffArray = Array.isArray(staffResponse) ? staffResponse : (staffResponse?.data || []);
  const totalCount = staffResponse?.meta?.totalCount || fallbackStaffCount || staffArray.length;

  if (!staffArray || staffArray.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-alt rounded-2xl border border-border">
        <p className="text-gray-500 text-lg">No staff members found for this department.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {staffArray.map((member) => (
          <StaffCard key={member.id} member={member} departmentSlug={departmentSlug} />
        ))}
      </div>
      <div className="text-center">
        <Link 
          to={`/departments/${departmentSlug}/staff`} 
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-dark text-white rounded-xl font-bold hover:bg-blue-primary transition-colors shadow-md hover:shadow-lg"
        >
          View all {totalCount} Faculty Members
        </Link>
      </div>
    </div>
  );
}

function StaffGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-square sm:aspect-[4/3] bg-gray-200"></div>
          <div className="p-8 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-4"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DepartmentRollOfHonour({ rollOfHonour }) {
  const [selectedAlumnus, setSelectedAlumnus] = React.useState(null);

  if (!rollOfHonour || rollOfHonour.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white border-t border-border py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Award size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
            Department Hall of Fame
          </h2>
          <p className="text-gray-600 leading-[1.7] text-lg">
            Celebrating the Best Graduating Students who have set the standard for academic excellence in our department.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {rollOfHonour.map((alumnus) => (
            <ProfileCard 
              key={alumnus.id}
              name={alumnus.name}
              subtitle={`${alumnus.award} (${alumnus.year})`}
              image={alumnus.photo}
            >
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-900">Matric No:</span> {alumnus.matricNo}</p>
                <p><span className="font-semibold text-slate-900">CGPA:</span> {alumnus.cgpa}</p>
                {alumnus.bio && (
                  <button 
                    onClick={() => setSelectedAlumnus(alumnus)}
                    aria-label={`Read full biography of ${alumnus.name}`}
                    className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Read more
                  </button>
                )}
              </div>
            </ProfileCard>
          ))}
        </div>
      </div>

      {/* BGS Modal */}
      {selectedAlumnus && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 mt-8 sm:mt-0">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold font-heading text-slate-900">About the BGS</h3>
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <img 
                  src={selectedAlumnus.photo || "/default-avatar.jpg"} 
                  alt={selectedAlumnus.name} 
                  className="w-24 h-24 rounded-full object-cover object-top border-4 border-indigo-100 shadow-sm"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{selectedAlumnus.name}</h4>
                  <p className="text-indigo-600 font-medium text-sm">{selectedAlumnus.award}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">CGPA: {selectedAlumnus.cgpa}</span>
                  </div>
                </div>
              </div>
              <div className="prose prose-slate prose-sm text-slate-600">
                <p className="leading-relaxed text-justify whitespace-pre-line">{selectedAlumnus.bio}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DepartmentTemplate() {
  const { department, staffPromise, rollOfHonourPromise } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Critical Path (FCP) — Hero & Overview render instantly */}
      <DepartmentHero department={department} />
      <DepartmentOverview department={department} />

      {/* 2. Staff Directory — Heavy relational join streamed via <Await> */}
      <section className="w-full bg-surface-alt border-t border-border py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
              Faculty & Staff
            </h2>
            <p className="text-gray-600 leading-[1.7] text-lg">
              Meet our distinguished professors, researchers, and dedicated staff members who drive the academic excellence of the department.
            </p>
          </div>

          <Suspense fallback={<StaffGridSkeleton />}>
            <Await 
              resolve={staffPromise}
              errorElement={<div className="text-red-600 text-center py-10 font-bold border border-red-200 bg-red-50 rounded-2xl">Failed to load staff directory.</div>}
            >
              {(staffResponse) => <StaffGrid staffResponse={staffResponse} departmentSlug={department.slug} fallbackStaffCount={department.staffCount} />}
            </Await>
          </Suspense>
        </div>
      </section>

      {/* 3. Roll of Honour — Streamed via <Await> */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-white border-t border-border">Loading Hall of Fame...</div>}>
        <Await 
          resolve={rollOfHonourPromise}
          errorElement={null}
        >
          {(rollOfHonour) => <DepartmentRollOfHonour rollOfHonour={rollOfHonour} />}
        </Await>
      </Suspense>

    </div>
  );
}
