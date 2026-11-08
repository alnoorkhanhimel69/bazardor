import BanglaDate from "./BanglaDate";

function BasketIllustration() {
  return (
    <svg
      viewBox="0 0 320 250"
      role="img"
      aria-label="সবজি ও ফলে ভরা একটি ঝুড়ি"
      className="h-auto w-full max-w-xs"
    >
      <ellipse cx="160" cy="228" rx="120" ry="12" fill="#dfe6dc" />
      {/* produce */}
      <circle cx="190" cy="78" r="44" fill="#22c55e" />
      <path d="M190 36c-4-14 2-24 12-30" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M168 60c-6 8-9 16-9 26" stroke="#4ade80" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".6" />
      <circle cx="122" cy="92" r="40" fill="#ef4444" />
      <path d="M122 54c-2-10 2-18 10-22" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M102 78c-5 7-7 14-7 22" stroke="#f87171" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".6" />
      <circle cx="234" cy="108" r="22" fill="#f59e0b" />
      <circle cx="152" cy="118" r="19" fill="#f97316" />
      <circle cx="84" cy="116" r="24" fill="#a855f7" />
      {/* basket */}
      <path d="M62 128h196l-22 92c-1 5-6 8-11 8H95c-5 0-10-3-11-8z" fill="#b45309" />
      <path d="M62 128h196l-5 22H67z" fill="#92400e" opacity=".35" />
      <rect x="52" y="116" width="216" height="20" rx="6" fill="#92400e" />
      {[102, 136, 170, 204].map((x) => (
        <path key={x} d={`M${x} 140v82`} stroke="#7c2d12" strokeWidth="3" opacity=".55" />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="surface overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-content">
            <BanglaDate />
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* Plain anchor: scrolls to the section on this page, no route change. */}
          <a href="#সব-পণ্য" className="btn btn-primary mt-6 font-semibold shadow-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <BasketIllustration />
        </div>
      </div>
    </section>
  );
}
