export function HeroIllustration() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative aspect-square w-full max-w-[480px]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#f0e4f8] via-[#fce8d5] to-[#f5e6f9]">
          {/* Sky floaters */}
          <div className="absolute right-[14%] top-[8%] animate-float" style={{ animationDelay: "1s" }}>
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" fill="#d4b8e0" opacity="0.5" /></svg>
          </div>
          <div className="absolute left-[18%] top-[12%] animate-float">
            <svg width="20" height="18" viewBox="0 0 20 18"><path d="M10 18s-1-1-4-4C3 11 0 8 0 5.5 0 2.5 2.5 0 5 0c1.5 0 3 .8 5 3C12 .8 13.5 0 15 0c2.5 0 5 2.5 5 5.5 0 2.5-3 5.5-6 8.5-3 3-4 4-4 4z" fill="#e8a0b8" opacity="0.6" /></svg>
          </div>
          <div className="absolute right-[24%] top-[20%] animate-float" style={{ animationDelay: "1.5s" }}>
            <svg width="14" height="13" viewBox="0 0 20 18"><path d="M10 18s-1-1-4-4C3 11 0 8 0 5.5 0 2.5 2.5 0 5 0c1.5 0 3 .8 5 3C12 .8 13.5 0 15 0c2.5 0 5 2.5 5 5.5 0 2.5-3 5.5-6 8.5-3 3-4 4-4 4z" fill="#e8a0b8" opacity="0.45" /></svg>
          </div>
          <div className="absolute left-[38%] top-[9%] animate-float" style={{ animationDelay: "0.8s" }}>
            <svg width="14" height="14" viewBox="0 0 24 24"><polygon points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" fill="#f0cfc0" opacity="0.55" /></svg>
          </div>
          <div className="absolute left-[10%] top-[16%] animate-float" style={{ animationDelay: "2.2s" }}>
            <svg width="11" height="11" viewBox="0 0 24 24"><polygon points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" fill="#f0cfc0" opacity="0.45" /></svg>
          </div>
          <div className="absolute left-[8%] top-[28%] animate-float" style={{ animationDelay: "0.5s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7 18 10 14 17 12V8z" fill="#b8d4a8" opacity="0.5" /></svg>
          </div>
          {/* Clouds */}
          <div className="absolute left-[8%] top-[4%]">
            <svg width="46" height="22" viewBox="0 0 50 24"><ellipse cx="25" cy="14" rx="22" ry="10" fill="#fff" opacity="0.45" /><ellipse cx="16" cy="10" rx="14" ry="10" fill="#fff" opacity="0.45" /><ellipse cx="34" cy="10" rx="14" ry="10" fill="#fff" opacity="0.45" /></svg>
          </div>
          <div className="absolute right-[6%] top-[10%] animate-float" style={{ animationDelay: "2s" }}>
            <svg width="36" height="18" viewBox="0 0 40 20"><ellipse cx="20" cy="12" rx="18" ry="8" fill="#fff" opacity="0.4" /><ellipse cx="12" cy="8" rx="11" ry="8" fill="#fff" opacity="0.4" /><ellipse cx="28" cy="8" rx="11" ry="8" fill="#fff" opacity="0.4" /></svg>
          </div>

          {/* Grass accent */}
          <div className="absolute -left-[5%] -right-[5%] bottom-[30%] h-[10px] rounded-[50%] bg-green opacity-70 blur-[2px]" />
          {/* Ground */}
          <div className="absolute -left-[5%] -right-[5%] bottom-0 h-[32%] rounded-t-[50%/30%] bg-gradient-to-b from-[#e5dcd0] to-[#ddd2c0]" />

          {/* Path dots */}
          <div className="absolute bottom-[23%] left-1/2 flex -translate-x-1/2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[#c9b8a0] opacity-50" />
            ))}
          </div>

          {/* Trees */}
          <div className="absolute bottom-[26%] left-[7%]">
            <div className="mx-auto h-9 w-9 rounded-full bg-green shadow-[inset_-5px_-3px_0_#a0c4a0]" />
            <div className="mx-auto h-[26px] w-2 rounded-[3px] bg-[#c9a090]" style={{ marginTop: "-3px" }} />
          </div>
          <div className="absolute bottom-[26%] right-[8%]">
            <div className="mx-auto h-[30px] w-[30px] rounded-full bg-[#c8ddb8] shadow-[inset_-5px_-3px_0_#b0ccaa]" />
            <div className="mx-auto h-[22px] w-2 rounded-[3px] bg-[#c9a090]" style={{ marginTop: "-3px" }} />
          </div>

          {/* House */}
          <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2">
            {/* Chimney */}
            <div className="absolute -top-[26px] right-[18px] h-[30px] w-4 rounded-t-[3px] bg-[#c9a8d8]" />
            {/* Roof */}
            <div className="mx-auto h-0 w-0 border-b-[48px] border-l-[78px] border-r-[78px] border-b-primary-light border-l-transparent border-r-transparent" />
            {/* Body */}
            <div className="relative mx-auto -mt-[2px] h-[88px] w-[130px] rounded-md bg-white shadow-[0_4px_20px_rgba(139,95,160,0.08)]">
              {/* Windows */}
              <div className="absolute left-4 top-[18px] h-[22px] w-[22px] rounded-[5px] border-2 border-card-border bg-peach-light" />
              <div className="absolute right-4 top-[18px] h-[22px] w-[22px] rounded-[5px] border-2 border-card-border bg-peach-light" />
              {/* Door */}
              <div className="absolute bottom-0 left-1/2 h-[42px] w-7 -translate-x-1/2 rounded-t-full bg-primary">
                <div className="absolute right-[6px] top-[48%] h-1 w-1 rounded-full bg-primary-light" />
              </div>
              {/* Glow */}
              <div className="absolute bottom-0 left-1/2 h-5 w-[60px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(252,232,213,0.5),transparent)]" />
            </div>
          </div>

          {/* People */}
          <div className="absolute bottom-[26%] left-[22%]">
            <div className="mx-auto mb-[1px] h-5 w-5 rounded-full bg-[#e8baa8]" />
            <div className="mx-auto h-[30px] w-[22px] rounded-[11px] bg-primary-light" />
          </div>
          <div className="absolute bottom-[26%] left-[29%]">
            <div className="mx-auto mb-[1px] h-[18px] w-[18px] rounded-full bg-[#c9a090]" />
            <div className="mx-auto h-[26px] w-[18px] rounded-[10px_10px_5px_5px] bg-[#a0c4b8]" />
          </div>
          <div className="absolute bottom-[26%] right-[20%]">
            <div className="mx-auto mb-[1px] h-5 w-5 rounded-full bg-[#d4a890]" />
            <div className="relative mx-auto h-7 w-5 rounded-[10px_10px_5px_5px] bg-peach">
              <div className="absolute -right-[9px] bottom-[7px] h-[10px] w-3 rounded-[3px] bg-[#c9a8d8]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
