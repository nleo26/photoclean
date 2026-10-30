import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRightIcon, LockIcon } from 'lucide-react';
import { ClutterGraphic } from '../components/ClutterGraphic';
import { ScaledPhone } from '../components/summary/ScaledPhone';
import { PhoneFrame } from '../components/PhoneFrame';
import { Screens } from '../components/Screens';
import { LibraryProvider } from '../contexts/LibraryContext';
import { summaryFeatures } from '../data/summaryFeatures';

export function Summary() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <div className="w-full bg-canvas font-sans text-ink">
      {/* Page 1 — landing */}
      <section
        id="overview"
        className="flex min-h-screen flex-col break-after-page px-6 sm:px-10 lg:px-16">
        
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-6">
          <span className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-ink">
            Rollup
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hidden font-display text-[14px] font-bold text-ink-soft transition-colors duration-150 ease-soft hover:text-ink sm:block">
              
              Features
            </a>
            <Link
              to="/"
              className="rounded-full bg-ink px-4 py-2 font-display text-[13.5px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.97]">
              
              Try the app
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h1 className="font-display text-[48px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[64px] lg:text-[72px]">
              Keep the memories.
              <br />
              <span className="text-spruce">Lose the clutter.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
              Find the moments you're looking for and clear out the blurry shots, old screenshots
              and duplicates burying them — so you never worry about losing a memory in the mess
              again.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-[16px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98]">
                
                Clean up now
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-150 ease-soft group-hover:translate-x-0.5"
                  strokeWidth={2.5} />
                
              </Link>
              <a
                href="#features"
                className="rounded-full px-5 py-4 font-display text-[15px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-ink/5">
                
                See how it works
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-ink-faint">
              <LockIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
              Works with iPhone Photos and Google Photos · sorted on your phone
            </p>
          </div>

          <div className="mx-auto w-full max-w-[440px] rounded-5xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,32,28,0.35)]">
            <ClutterGraphic />
          </div>
        </div>
      </section>

      {/* Page 2 — features */}
      <section
        id="features"
        className="flex min-h-screen flex-col justify-center border-t border-ink/8 bg-sand px-6 py-16 sm:px-10 lg:px-16">
        
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mx-auto max-w-2xl text-center font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[44px]">
            Three things your photo app should already do.
          </h2>

          <ul className="mt-14 grid gap-14 lg:grid-cols-3 lg:gap-8">
            {summaryFeatures.map((feature) =>
            <li key={feature.id} className="flex flex-col items-center text-center">
                <ScaledPhone scale={0.7}>
                  <LibraryProvider initialTab={feature.tab}>
                    <PhoneFrame framed>
                      <Screens homeVariant="minimal" findQuery={feature.findQuery} />
                    </PhoneFrame>
                  </LibraryProvider>
                </ScaledPhone>
                <h3 className="mt-8 font-display text-[20px] font-extrabold tracking-[-0.01em] text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[18rem] text-[14.5px] leading-relaxed text-ink-soft">
                  {feature.copy}
                </p>
              </li>
            )}
          </ul>

          <div className="mt-14 flex justify-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-spruce px-7 py-4 font-display text-[16px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98]">
              
              Clean up now
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-150 ease-soft group-hover:translate-x-0.5"
                strokeWidth={2.5} />
              
            </Link>
          </div>
        </div>
      </section>
    </div>);

}