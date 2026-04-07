export function HeroIllustration() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative aspect-square w-full max-w-[480px]">
        {/* Main circle */}
        <div
          className="relative h-full w-full overflow-hidden rounded-full"
          style={{
            background:
              "linear-gradient(180deg,#d0c2e0 0%,#ddd0ea 18%,#eadaf5 36%,#f5e2d5 56%,#f0dde8 100%)",
          }}
        >
          {/* ── SKY: moon + 3 stars + 1 heart + 1 cloud ── */}

          {/* Moon with glow */}
          <div
            className="absolute animate-float"
            style={{ right: "12%", top: "5%", animationDelay: "1s" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <radialGradient id="moonglow">
                  <stop offset="0%" stopColor="#f8f2fa" />
                  <stop offset="100%" stopColor="#e8daf2" />
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="17" fill="url(#moonglow)" opacity=".5" />
              <circle cx="26" cy="16" r="14" fill="#d0c2e0" />
            </svg>
          </div>
          <div
            className="pointer-events-none absolute"
            style={{
              right: "9%",
              top: "3%",
              width: 65,
              height: 65,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(240,228,248,.12),transparent)",
            }}
          />

          {/* 3 stars */}
          <div
            className="absolute animate-[twinkle_3s_ease-in-out_infinite]"
            style={{ left: "11%", top: "7%" }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24">
              <polygon
                points="12,2 14,10 22,10 16,14 18,22 12,17 6,22 8,14 2,10 10,10"
                fill="#f0cfc0"
                opacity=".55"
              />
            </svg>
          </div>
          <div
            className="absolute animate-[twinkle_3s_ease-in-out_infinite]"
            style={{ left: "30%", top: "4%", animationDelay: ".7s" }}
          >
            <svg width="7" height="7" viewBox="0 0 24 24">
              <polygon
                points="12,2 14,10 22,10 16,14 18,22 12,17 6,22 8,14 2,10 10,10"
                fill="#d4b8e0"
                opacity=".5"
              />
            </svg>
          </div>
          <div
            className="absolute animate-[twinkle_3s_ease-in-out_infinite]"
            style={{ left: "50%", top: "6%", animationDelay: "1.5s" }}
          >
            <svg width="5" height="5" viewBox="0 0 24 24">
              <polygon
                points="12,2 14,10 22,10 16,14 18,22 12,17 6,22 8,14 2,10 10,10"
                fill="#f0cfc0"
                opacity=".4"
              />
            </svg>
          </div>

          {/* 1 heart */}
          <div
            className="absolute animate-float"
            style={{ left: "20%", top: "11%", animationDelay: ".5s" }}
          >
            <svg width="16" height="14" viewBox="0 0 20 18">
              <path
                d="M10 18s-1-1-4-4C3 11 0 8 0 5.5 0 2.5 2.5 0 5 0c1.5 0 3 .8 5 3C12 .8 13.5 0 15 0c2.5 0 5 2.5 5 5.5 0 2.5-3 5.5-6 8.5l-4 4z"
                fill="#e8a0b8"
                opacity=".35"
              />
            </svg>
          </div>

          {/* 1 cloud */}
          <div className="absolute" style={{ left: "4%", top: "1%" }}>
            <svg width="56" height="28" viewBox="0 0 56 28">
              <ellipse cx="28" cy="16" rx="25" ry="12" fill="#fff" opacity=".16" />
              <ellipse cx="18" cy="12" rx="16" ry="12" fill="#fff" opacity=".16" />
              <ellipse cx="38" cy="12" rx="16" ry="12" fill="#fff" opacity=".16" />
            </svg>
          </div>

          {/* ── BACKGROUND HILLS ── */}
          <div
            className="absolute"
            style={{
              bottom: "33%",
              left: "-15%",
              right: "-15%",
              height: 50,
              borderRadius: "50%",
              background: "#bcc8ac",
              opacity: 0.12,
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "30%",
              left: "15%",
              right: "-20%",
              height: 40,
              borderRadius: "50%",
              background: "#c4d4b4",
              opacity: 0.1,
            }}
          />

          {/* ── GROUND ── */}
          <div
            className="absolute"
            style={{
              bottom: 0,
              left: "-5%",
              right: "-5%",
              height: "38%",
              borderRadius: "50% 50% 0 0/26% 26% 0 0",
              background: "linear-gradient(180deg,#d0c5b0,#c5baa0)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "34%",
              left: "-5%",
              right: "-5%",
              height: 14,
              borderRadius: "50%",
              background: "#aac494",
              opacity: 0.3,
              filter: "blur(3px)",
            }}
          />

          {/* Grass tufts */}
          <svg
            className="absolute"
            style={{ bottom: "30%", left: 0, right: 0 }}
            width="100%"
            height="20"
            viewBox="0 0 460 20"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M30 18Q32 6 34 18" stroke="#98b488" strokeWidth="1.5" opacity=".2" />
            <path d="M80 18Q82 8 84 18" stroke="#90ac80" strokeWidth="1" opacity=".15" />
            <path d="M380 18Q382 6 384 18" stroke="#98b488" strokeWidth="1.5" opacity=".2" />
            <path d="M420 18Q422 8 424 18" stroke="#90ac80" strokeWidth="1" opacity=".15" />
          </svg>

          {/* ── STEPPING STONES ── */}
          <svg
            className="absolute"
            style={{ bottom: "14%", left: "48%", transform: "translateX(-48%)" }}
            width="240"
            height="55"
            viewBox="0 0 240 55"
            fill="none"
          >
            <ellipse cx="20" cy="45" rx="16" ry="6" fill="#b8ac98" opacity=".12" />
            <ellipse cx="20" cy="43" rx="15" ry="5.5" fill="#c5b8a5" opacity=".25" />
            <ellipse cx="68" cy="34" rx="13" ry="5" fill="#b8ac98" opacity=".1" />
            <ellipse cx="68" cy="32" rx="12" ry="4.5" fill="#c5b8a5" opacity=".22" />
            <ellipse cx="120" cy="38" rx="15" ry="5.5" fill="#b8ac98" opacity=".12" />
            <ellipse cx="120" cy="36" rx="14" ry="5" fill="#c5b8a5" opacity=".25" />
            <ellipse cx="172" cy="28" rx="12" ry="5" fill="#b8ac98" opacity=".1" />
            <ellipse cx="172" cy="26" rx="11" ry="4.5" fill="#c5b8a5" opacity=".22" />
            <ellipse cx="222" cy="34" rx="14" ry="5.5" fill="#b8ac98" opacity=".1" />
            <ellipse cx="222" cy="32" rx="13" ry="5" fill="#c5b8a5" opacity=".22" />
          </svg>

          {/* ── LEFT TREE (larger, forward) ── */}
          <div className="absolute" style={{ bottom: "30%", left: "3%" }}>
            <div className="relative">
              <div
                className="mx-auto"
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%,#a8cc98,#88b078)",
                  boxShadow: "3px 5px 10px rgba(0,0,0,.05)",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: -12,
                  left: 26,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%,#b8d8a8,#98c488)",
                  opacity: 0.8,
                }}
              />
              <div
                className="absolute"
                style={{
                  top: -5,
                  right: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#c0ddb0",
                  opacity: 0.65,
                }}
              />
            </div>
            <div
              className="mx-auto"
              style={{
                width: 10,
                height: 34,
                background: "linear-gradient(90deg,#9c8470,#b49880)",
                borderRadius: 3,
                marginTop: -4,
              }}
            />
          </div>

          {/* ── RIGHT TREE (smaller, set back) ── */}
          <div className="absolute" style={{ bottom: "31%", right: "5%" }}>
            <div className="relative">
              <div
                className="mx-auto"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%,#98c088,#80ac6c)",
                  boxShadow: "2px 4px 8px rgba(0,0,0,.04)",
                  opacity: 0.8,
                }}
              />
              <div
                className="absolute"
                style={{
                  top: -6,
                  right: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%,#a8cc98,#90b880)",
                  opacity: 0.65,
                }}
              />
            </div>
            <div
              className="mx-auto"
              style={{
                width: 7,
                height: 24,
                background: "linear-gradient(90deg,#9c8470,#b49880)",
                borderRadius: 3,
                marginTop: -3,
                opacity: 0.8,
              }}
            />
          </div>

          {/* ── FLOWERS — left cluster ── */}
          <svg
            className="absolute"
            style={{ bottom: "30%", left: "16%" }}
            width="38"
            height="28"
            viewBox="0 0 38 28"
            fill="none"
          >
            <circle cx="10" cy="5" r="4" fill="#e8a0b8" opacity=".55" />
            <circle cx="7" cy="3.5" r="2.5" fill="#f0cfc0" opacity=".35" />
            <circle cx="13" cy="3.5" r="2.5" fill="#f0cfc0" opacity=".35" />
            <rect x="9" y="8" width="2" height="18" rx="1" fill="#7da868" />
            <path d="M10 18Q5 16 3 12" stroke="#7da868" strokeWidth="1" opacity=".4" />
            <ellipse cx="3" cy="12" rx="3.5" ry="2" fill="#90b480" opacity=".35" transform="rotate(-25 3 12)" />
            <circle cx="22" cy="8" r="3.5" fill="#d4b8e0" opacity=".5" />
            <circle cx="19.5" cy="6.5" r="2" fill="#e8daf2" opacity=".3" />
            <circle cx="24.5" cy="6.5" r="2" fill="#e8daf2" opacity=".3" />
            <rect x="21" y="10" width="2" height="16" rx="1" fill="#7da868" />
            <circle cx="32" cy="10" r="2.5" fill="#f0cfc0" opacity=".45" />
            <rect x="31" y="12" width="2" height="12" rx="1" fill="#7da868" />
          </svg>

          {/* Flowers — right cluster */}
          <svg
            className="absolute"
            style={{ bottom: "31%", right: "18%" }}
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
          >
            <circle cx="8" cy="5.5" r="3.5" fill="#d4b8e0" opacity=".5" />
            <circle cx="5" cy="4" r="2.5" fill="#e8a0b8" opacity=".3" />
            <circle cx="11" cy="4" r="2.5" fill="#e8a0b8" opacity=".3" />
            <rect x="7" y="8" width="2" height="14" rx="1" fill="#7da868" />
            <circle cx="22" cy="8" r="2.5" fill="#e8a0b8" opacity=".4" />
            <rect x="21" y="10" width="2" height="12" rx="1" fill="#7da868" />
          </svg>

          {/* Lone flower — breaks symmetry */}
          <svg
            className="absolute"
            style={{ bottom: "29%", left: "58%" }}
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
          >
            <circle cx="5" cy="4" r="2.5" fill="#f0cfc0" opacity=".4" />
            <rect x="4" y="6" width="2" height="10" rx="1" fill="#7da868" />
          </svg>

          {/* ── HOUSE ── */}
          <div
            className="absolute"
            style={{ bottom: "28%", left: "50%", transform: "translateX(-50%)" }}
          >
            {/* Chimney + smoke */}
            <div
              className="absolute"
              style={{
                top: -28,
                right: 12,
                width: 16,
                height: 32,
                background: "linear-gradient(90deg,#a080b0,#b090c0)",
                borderRadius: "3px 3px 0 0",
              }}
            >
              <div
                className="absolute"
                style={{
                  top: -2,
                  left: -1.5,
                  right: -1.5,
                  height: 4,
                  background: "#9070a0",
                  borderRadius: 2,
                }}
              />
              <div
                className="absolute animate-[smoke-rise_3.5s_ease-out_infinite]"
                style={{
                  top: -10,
                  left: 2,
                  width: 10,
                  height: 10,
                  background: "rgba(190,175,210,.18)",
                  borderRadius: "50%",
                }}
              />
              <div
                className="absolute animate-[smoke-rise_3.5s_ease-out_infinite]"
                style={{
                  top: -10,
                  left: 5,
                  width: 7,
                  height: 7,
                  background: "rgba(190,175,210,.12)",
                  borderRadius: "50%",
                  animationDelay: "1.6s",
                }}
              />
              <div
                className="absolute animate-[smoke-rise_3.5s_ease-out_infinite]"
                style={{
                  top: -10,
                  left: 0,
                  width: 8,
                  height: 8,
                  background: "rgba(190,175,210,.09)",
                  borderRadius: "50%",
                  animationDelay: "3s",
                }}
              />
            </div>

            {/* Roof */}
            <svg
              width="156"
              height="50"
              viewBox="0 0 156 50"
              className="mx-auto block"
            >
              <defs>
                <pattern id="roofP" width="10" height="8" patternUnits="userSpaceOnUse">
                  <path d="M0 4L5 0L10 4" stroke="#fff" strokeWidth=".5" fill="none" opacity=".4" />
                </pattern>
              </defs>
              <polygon points="78,0 156,48 0,48" fill="#c0a0d0" />
              <polygon points="78,0 156,48 0,48" fill="url(#roofP)" opacity=".12" />
              <line x1="78" y1="0" x2="78" y2="48" stroke="#b090c0" strokeWidth=".4" opacity=".25" />
            </svg>

            {/* Body */}
            <div
              className="relative mx-auto"
              style={{
                width: 130,
                height: 88,
                background: "#fff",
                marginTop: -2,
                borderRadius: "0 0 6px 6px",
                boxShadow: "0 5px 24px rgba(139,95,160,.1)",
              }}
            >
              {/* Left window */}
              <div
                className="absolute"
                style={{
                  left: 12,
                  top: 14,
                  width: 26,
                  height: 26,
                  borderRadius: 5,
                  border: "2px solid #e0d2ea",
                  background: "linear-gradient(135deg,#fce8d5,#f8dcc0)",
                  boxShadow: "0 0 14px rgba(252,215,165,.45),inset 0 0 4px rgba(252,232,213,.3)",
                }}
              >
                <div className="absolute" style={{ top: "50%", left: 0, right: 0, height: 1.5, background: "#e0d2ea" }} />
                <div className="absolute" style={{ left: "50%", top: 0, bottom: 0, width: 1.5, background: "#e0d2ea" }} />
              </div>

              {/* Right window */}
              <div
                className="absolute"
                style={{
                  right: 12,
                  top: 14,
                  width: 26,
                  height: 26,
                  borderRadius: 5,
                  border: "2px solid #e0d2ea",
                  background: "linear-gradient(135deg,#fce8d5,#f8dcc0)",
                  boxShadow: "0 0 14px rgba(252,215,165,.45),inset 0 0 4px rgba(252,232,213,.3)",
                }}
              >
                <div className="absolute" style={{ top: "50%", left: 0, right: 0, height: 1.5, background: "#e0d2ea" }} />
                <div className="absolute" style={{ left: "50%", top: 0, bottom: 0, width: 1.5, background: "#e0d2ea" }} />
              </div>

              {/* Door */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 30,
                  height: 44,
                  background: "linear-gradient(180deg,#8b5fa0,#7a508e)",
                  borderRadius: "15px 15px 0 0",
                  boxShadow: "inset 0 -5px 10px rgba(90,60,105,.2)",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    right: 6,
                    top: "50%",
                    width: 4,
                    height: 4,
                    background: "#d4b8e0",
                    borderRadius: "50%",
                    boxShadow: "0 0 3px rgba(212,184,224,.4)",
                  }}
                />
              </div>

              {/* Door glow */}
              <div
                className="absolute animate-[glow_3.5s_ease-in-out_infinite]"
                style={{
                  bottom: -2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 44,
                  height: 7,
                  background: "radial-gradient(ellipse,rgba(252,232,213,.3),transparent)",
                  borderRadius: "50%",
                }}
              />

              {/* Porch */}
              <div
                className="absolute"
                style={{
                  bottom: -6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 56,
                  height: 7,
                  background: "linear-gradient(90deg,#d5c8b5,#ddd2c0)",
                  borderRadius: 3,
                  boxShadow: "0 2px 4px rgba(0,0,0,.04)",
                }}
              />

              {/* Porch light */}
              <div
                className="absolute animate-[glow_3.5s_ease-in-out_infinite]"
                style={{
                  top: 5,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 6,
                  height: 8,
                  background: "radial-gradient(circle,#fce8d5,#f5d5b8)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(252,215,165,.45)",
                }}
              />
            </div>
          </div>

          {/* ── CAT on porch ── */}
          <div className="absolute" style={{ bottom: "30%", left: "56%" }}>
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <ellipse cx="9" cy="11" rx="6" ry="4.5" fill="#9c8878" opacity=".55" />
              <circle cx="9" cy="7" r="3.5" fill="#9c8878" opacity=".55" />
              <path d="M6.5 4L5.5 1.5" stroke="#9c8878" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
              <path d="M11.5 4L12.5 1.5" stroke="#9c8878" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
              <path d="M15 11Q17 8 15 6" stroke="#9c8878" strokeWidth="1.3" strokeLinecap="round" opacity=".45" />
              <circle cx="7.8" cy="6.5" r=".8" fill="#c8b8a8" opacity=".5" />
              <circle cx="10.2" cy="6.5" r=".8" fill="#c8b8a8" opacity=".5" />
            </svg>
          </div>

          {/* ── PEOPLE ── */}

          {/* Parent (left, foreground) — hand on belly */}
          <div className="absolute" style={{ bottom: "26%", left: "22%" }}>
            <svg width="46" height="80" viewBox="0 0 46 80" fill="none">
              <defs>
                <radialGradient id="skinA" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#f0c8b8" />
                  <stop offset="100%" stopColor="#e0b0a0" />
                </radialGradient>
                <linearGradient id="dressA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4b8e0" />
                  <stop offset="100%" stopColor="#c4a4d0" />
                </linearGradient>
              </defs>
              <circle cx="23" cy="14" r="12" fill="url(#skinA)" />
              <path d="M11 11 Q10 4, 16 2 Q23 0, 30 2 Q36 4, 35 11" fill="#4a2e20" />
              <path d="M11 11 Q9 20, 10 28" stroke="#4a2e20" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M35 11 Q37 20, 36 26" stroke="#4a2e20" strokeWidth="3" strokeLinecap="round" />
              <circle cx="19" cy="14" r="1.2" fill="#6b4c3a" opacity=".6" />
              <circle cx="27" cy="14" r="1.2" fill="#6b4c3a" opacity=".6" />
              <path d="M20 18.5 Q23 21, 26 18.5" stroke="#c09880" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".5" />
              <rect x="20" y="25" width="6" height="5" rx="3" fill="url(#skinA)" />
              <path d="M14 30 Q10 50, 12 72 L34 72 Q36 50, 32 30 Q28 28, 23 28 Q18 28, 14 30z" fill="url(#dressA)" />
              <path d="M16 44 Q20 54, 30 50" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" fill="none" />
              <path d="M14 32 Q8 40, 10 52" stroke="#c8a8d4" strokeWidth="5" strokeLinecap="round" />
              <path d="M32 32 Q36 38, 32 46 Q28 50, 24 48" stroke="#c8a8d4" strokeWidth="5" strokeLinecap="round" />
              <circle cx="24" cy="48" r="3" fill="url(#skinA)" opacity=".85" />
              <ellipse cx="17" cy="74" rx="5" ry="2.5" fill="#b49880" opacity=".35" />
              <ellipse cx="29" cy="74" rx="5" ry="2.5" fill="#b49880" opacity=".35" />
            </svg>
          </div>

          {/* Partner (center-left, slightly behind) — arm toward parent */}
          <div className="absolute" style={{ bottom: "28%", left: "32%" }}>
            <svg width="38" height="68" viewBox="0 0 38 68" fill="none">
              <defs>
                <radialGradient id="skinB" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#dab8a8" />
                  <stop offset="100%" stopColor="#c8a090" />
                </radialGradient>
                <linearGradient id="shirtB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a0c4b8" />
                  <stop offset="100%" stopColor="#88b0a4" />
                </linearGradient>
              </defs>
              <circle cx="19" cy="12" r="10" fill="url(#skinB)" />
              <path d="M9 9 Q9 3, 14 1.5 Q19 0, 24 1.5 Q29 3, 29 9" fill="#3a2820" />
              <circle cx="16" cy="12" r="1.1" fill="#5a3a2a" opacity=".6" />
              <circle cx="22" cy="12" r="1.1" fill="#5a3a2a" opacity=".6" />
              <path d="M17 15.5 Q19 17.5, 21 15.5" stroke="#b08870" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".45" />
              <rect x="16" y="21" width="6" height="4" rx="3" fill="url(#skinB)" />
              <path d="M10 26 Q8 42, 10 62 L28 62 Q30 42, 28 26 Q24 24, 19 24 Q14 24, 10 26z" fill="url(#shirtB)" />
              <path d="M10 28 Q4 34, 6 44" stroke="#90b4a8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="6" cy="44" r="2.5" fill="url(#skinB)" opacity=".8" />
              <path d="M28 28 Q32 36, 30 48" stroke="#90b4a8" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="14" cy="64" rx="4.5" ry="2" fill="#8a7260" opacity=".3" />
              <ellipse cx="24" cy="64" rx="4.5" ry="2" fill="#8a7260" opacity=".3" />
            </svg>
          </div>

          {/* Midwife (right, foreground) — walking toward couple, bag */}
          <div className="absolute" style={{ bottom: "27%", right: "17%" }}>
            <svg width="48" height="78" viewBox="0 0 48 78" fill="none">
              <defs>
                <radialGradient id="skinC" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#e4c0a8" />
                  <stop offset="100%" stopColor="#d0a890" />
                </radialGradient>
                <linearGradient id="topC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0cfc0" />
                  <stop offset="100%" stopColor="#e4baa8" />
                </linearGradient>
                <linearGradient id="bagC" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#b898c8" />
                  <stop offset="100%" stopColor="#a484b4" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="14" r="11.5" fill="url(#skinC)" />
              <path d="M12.5 10 Q12 4, 17 2 Q24 0, 31 2 Q36 4, 35.5 10" fill="#7a5438" />
              <circle cx="24" cy="2" r="7" fill="#7a5438" />
              <path d="M12.5 10 Q10 16, 12 20" stroke="#7a5438" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35.5 10 Q38 16, 36 20" stroke="#7a5438" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="14.5" r="1.2" fill="#5a3a2a" opacity=".6" />
              <circle cx="28" cy="14.5" r="1.2" fill="#5a3a2a" opacity=".6" />
              <path d="M21 19 Q24 22, 27 19" stroke="#c09070" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".5" />
              <rect x="21" y="25" width="6" height="5" rx="3" fill="url(#skinC)" />
              <path d="M14 30 Q10 48, 13 70 L35 70 Q38 48, 34 30 Q30 28, 24 28 Q18 28, 14 30z" fill="url(#topC)" />
              <path d="M14 32 Q6 40, 8 50" stroke="#ecc4b0" strokeWidth="5" strokeLinecap="round" />
              <circle cx="8" cy="50" r="2.8" fill="url(#skinC)" opacity=".85" />
              <path d="M34 32 Q40 40, 42 50" stroke="#ecc4b0" strokeWidth="5" strokeLinecap="round" />
              <rect x="36" y="48" rx="3" width="14" height="13" fill="url(#bagC)" />
              <rect x="38" y="46" rx="1" width="10" height="3" fill="#a080b0" />
              <line x1="40" y1="52" x2="48" y2="52" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
              <ellipse cx="18" cy="72" rx="5" ry="2.5" fill="#9c8470" opacity=".3" />
              <ellipse cx="30" cy="72" rx="5" ry="2.5" fill="#9c8470" opacity=".3" />
            </svg>
          </div>

          {/* Small heart between people */}
          <div
            className="absolute animate-float"
            style={{ bottom: "48%", left: "42%", animationDelay: ".8s" }}
          >
            <svg width="14" height="12" viewBox="0 0 20 18">
              <path
                d="M10 18s-1-1-4-4C3 11 0 8 0 5.5 0 2.5 2.5 0 5 0c1.5 0 3 .8 5 3C12 .8 13.5 0 15 0c2.5 0 5 2.5 5 5.5 0 2.5-3 5.5-6 8.5l-4 4z"
                fill="#e8a0b8"
                opacity=".4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
