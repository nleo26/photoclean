import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, SendIcon } from 'lucide-react';
import { recipients, subjectPhotos, subjects } from '../data/people';
import { PersonPicker } from '../components/PersonPicker';
import { PhotoGrid } from '../components/PhotoGrid';
import { useScreenInit } from '../useScreenInit.js';

type Status = 'editing' | 'sending' | 'sent';

export function Share() {
  const screenInit = useScreenInit();
  const [subjectId, setSubjectId] = useState('jimmy');
  const [recipientId, setRecipientId] = useState('mom');
  const [status, setStatus] = useState<Status>(
    screenInit.shareStatus === 'sent' ? 'sent' : 'editing'
  );
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const photos = useMemo(() => subjectPhotos[subjectId] ?? [], [subjectId]);
  const [selected, setSelected] = useState<string[]>(() => photos.map((p) => p.id));

  useEffect(() => {
    setSelected(photos.map((p) => p.id));
  }, [photos]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const subject = subjects.find((s) => s.id === subjectId)!;
  const recipient = recipients.find((r) => r.id === recipientId)!;

  const toggle = (id: string) =>
  setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  const send = () => {
    setStatus('sending');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('sent'), 900);
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <motion.span
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-spruce">
          
          <CheckIcon className="h-8 w-8" strokeWidth={3} />
        </motion.span>
        <h1 className="mt-5 font-display text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
          Sent to {recipient.name}
        </h1>
        <p className="mt-2 max-w-[250px] text-[14px] leading-relaxed text-ink-soft">
          {selected.length} photos of {subject.name} are on their way. They can save the full-quality
          versions for 30 days.
        </p>
        <button
          type="button"
          onClick={() => setStatus('editing')}
          className="mt-8 w-full rounded-3xl bg-ink py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
          
          Share something else
        </button>
      </div>);

  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pb-4 pt-3 no-scrollbar">
        <h1 className="font-display text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
          Send a whole person's photos in two taps.
        </h1>

        <div className="mt-6 flex flex-col gap-5">
          <PersonPicker
            label="Photos of"
            people={subjects}
            selectedId={subjectId}
            onSelect={setSubjectId} />
          
          <PersonPicker
            label="Share with"
            people={recipients}
            selectedId={recipientId}
            onSelect={setRecipientId} />
          
        </div>

        <div className="mt-7 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[15px] font-bold text-ink">
            {photos.length} recent photos
          </h2>
          <button
            type="button"
            onClick={() =>
            setSelected(selected.length === photos.length ? [] : photos.map((p) => p.id))
            }
            className="font-display text-[13px] font-bold text-spruce transition-opacity duration-150 ease-soft hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 rounded-full px-1">
            
            {selected.length === photos.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <p className="mb-3 mt-1 text-[12px] text-ink-faint">
          Tap any photo to leave it out of this send.
        </p>
        <PhotoGrid photos={photos} selectedIds={selected} onToggle={toggle} />
      </div>

      <div className="shrink-0 border-t border-ink/6 bg-surface px-6 pb-3 pt-3">
        <AnimatePresence initial={false} mode="wait">
          <motion.button
            key={status}
            type="button"
            disabled={selected.length === 0 || status === 'sending'}
            onClick={send}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
            className="flex w-full items-center justify-center gap-2 rounded-3xl bg-spruce py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] disabled:bg-ink/12 disabled:text-ink-faint focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
            
            {status === 'sending' ?
            'Sending…' :

            <>
                <SendIcon className="h-4 w-4" strokeWidth={2.4} />
                {selected.length === 0 ?
              'Pick at least one photo' :
              `Send ${selected.length} to ${recipient.name}`}
              </>
            }
          </motion.button>
        </AnimatePresence>
      </div>
    </div>);

}