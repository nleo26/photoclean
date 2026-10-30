import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLibrary } from '../contexts/LibraryContext';
import { TabBar } from './TabBar';
import { Tidy } from '../pages/Tidy';
import { Home } from '../pages/Home';
import { Find } from '../pages/Find';
import { Share } from '../pages/Share';

export function Screens({
  homeVariant,
  findQuery



}: {homeVariant: 'minimal' | 'detailed';findQuery?: string;}) {
  const { tab } = useLibrary();

  return (
    <>
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.main
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-1 flex-col overflow-hidden">
            
            {tab === 'tidy' && (homeVariant === 'minimal' ? <Home /> : <Tidy />)}
            {tab === 'find' && <Find presetQuery={findQuery} />}
            {tab === 'share' && <Share />}
          </motion.main>
        </AnimatePresence>
      </div>
      <TabBar />
    </>);

}