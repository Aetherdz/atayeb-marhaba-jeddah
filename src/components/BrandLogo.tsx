interface BrandLogoProps {
  onClick: () => void;
}

export function BrandLogo({ onClick }: BrandLogoProps) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label="اطايب مرحبا - ATAYEB MARHABA"
      className="group inline-flex items-center gap-3 shrink-0 rounded-xl py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
    >
      {/* Warm bakery-orange circular badge with minimalist wheat stalk icon */}
      <span
        aria-hidden="true"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D96B23] to-[#B54B0E] dark:from-[#E57A32] dark:to-[#C25514] text-[#FFFDF9] shadow-xs ring-1 ring-[#A8440B]/20 dark:ring-[#F5A166]/25 transition-transform duration-200 group-hover:scale-[1.03]"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 sm:w-[26px] sm:h-[26px]"
        >
          {/* Central stem */}
          <path
            d="M16 26.5V9.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          {/* Top crown grain */}
          <path
            d="M16 5.2C17.4 6.7 17.4 8.9 16 10.2C14.6 8.9 14.6 6.7 16 5.2Z"
            fill="currentColor"
          />
          {/* Upper grain pair */}
          <path
            d="M15.4 13C12.8 12.6 11.1 11 11 8.8C13.3 9 15 10.6 15.4 13Z"
            fill="currentColor"
          />
          <path
            d="M16.6 13C19.2 12.6 20.9 11 21 8.8C18.7 9 17 10.6 16.6 13Z"
            fill="currentColor"
          />
          {/* Middle grain pair */}
          <path
            d="M15.4 17.6C12.5 17.2 10.6 15.5 10.5 13.1C13 13.3 14.9 15 15.4 17.6Z"
            fill="currentColor"
          />
          <path
            d="M16.6 17.6C19.5 17.2 21.4 15.5 21.5 13.1C19 13.3 17.1 15 16.6 17.6Z"
            fill="currentColor"
          />
          {/* Lower grain pair */}
          <path
            d="M15.4 22.1C12.7 21.7 10.9 20.1 10.8 17.8C13.2 18 14.9 19.6 15.4 22.1Z"
            fill="currentColor"
          />
          <path
            d="M16.6 22.1C19.3 21.7 21.1 20.1 21.2 17.8C18.8 18 17.1 19.6 16.6 22.1Z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Exact verified brand lockup only */}
      <span className="flex flex-col leading-none text-start">
        <span className="font-display text-base sm:text-[19px] font-bold tracking-tight text-[#241914] dark:text-[#F6EDE3] group-hover:text-[#C85A17] dark:group-hover:text-[#E57A32] transition-colors whitespace-nowrap">
          اطايب مرحبا
        </span>
        <span
          dir="ltr"
          className="mt-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.13em] text-[#7A543E] dark:text-[#D9B8A0] whitespace-nowrap"
        >
          ATAYEB MARHABA
        </span>
      </span>
    </a>
  );
}
