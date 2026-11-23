import { ExternalLink, MapPin } from 'lucide-react';
import {
  getGoogleMapsSearchUrl,
  JEDDAH_BRANCH_ADDRESSES,
  Language,
  UI_COPY,
} from '../data/bakeryData';

interface BranchesViewProps {
  lang: Language;
}

export function BranchesView({ lang }: BranchesViewProps) {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-2.5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241914] dark:text-[#F6EDE3]">
          {UI_COPY.branches.pageTitle[lang]}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-[#6B5446] dark:text-[#BFA99A]">
          {UI_COPY.branches.pageSubtitle[lang]}
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {JEDDAH_BRANCH_ADDRESSES.map((address) => (
          <li key={address}>
            <a
              href={getGoogleMapsSearchUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#221A16] border border-[#E6D8C8] dark:border-[#362A22] hover:border-[#C85A17] dark:hover:border-[#E57A32] transition-all duration-200 flex items-start justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] dark:focus-visible:outline-[#E57A32]"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <span className="mt-0.5 w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[#F4E9DC] dark:bg-[#2F241E] text-[#B24E12] dark:text-[#E57A32] group-hover:bg-[#C85A17] group-hover:text-[#FFFDF9] dark:group-hover:bg-[#E57A32] dark:group-hover:text-[#17120F] transition-colors">
                  <MapPin className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>

                <div className="space-y-2 min-w-0">
                  <p
                    dir="ltr"
                    className={`text-sm sm:text-[15px] font-semibold leading-relaxed text-[#241914] dark:text-[#F6EDE3] ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {address}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A4715] dark:text-[#E57A32]">
                    <span>{UI_COPY.actions.openInMaps[lang]}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
