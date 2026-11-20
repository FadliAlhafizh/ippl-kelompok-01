import React from 'react';

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconSearch = (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
export const IconUser = (p) => <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
export const IconBag = (p) => <svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
export const IconHeart = ({ filled, ...p }) => (
    <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" /></svg>
);
export const IconMail = (p) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></svg>;
export const IconLock = (p) => <svg {...base} {...p}><rect x="5" y="10" width="14" height="11" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
export const IconClock = (p) => <svg {...base} {...p}><path d="M20 12a8 8 0 1 1-2.5-5.8" /><path d="M20 4v4h-4" /><path d="M12 8v4l3 2" /></svg>;
export const IconChevronDown = (p) => <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>;
export const IconArrowLeft = (p) => <svg {...base} {...p}><path d="M19 12H5m6-6-6 6 6 6" /></svg>;
export const IconArrowRight = (p) => <svg {...base} {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
export const IconCheck = (p) => <svg {...base} strokeWidth={2.4} {...p}><path d="m5 12 5 5 9-10" /></svg>;
export const IconReply = (p) => <svg {...base} {...p}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 6 6v3" /></svg>;
export const IconCalendar = (p) => <svg {...base} {...p}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4m6-4v4" /></svg>;
export const IconLink = (p) => <svg {...base} {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>;
export const IconPlus = (p) => <svg {...base} strokeWidth={2.2} {...p}><path d="M12 5v14M5 12h14" /></svg>;
export const IconHome = (p) => <svg {...base} {...p}><path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /></svg>;
export const IconList = (p) => <svg {...base} {...p}><path d="M4 7h16M4 12h10M4 17h16" /></svg>;
export const IconFile = (p) => <svg {...base} {...p}><path d="M7 3h7l5 5v13H7V3Z" /><path d="M14 3v5h5" /></svg>;
export const IconChart = (p) => <svg {...base} {...p}><path d="M5 20V10m5 10V4m5 16v-7m5 7V8" /></svg>;
export const IconPencil = (p) => <svg {...base} {...p}><path d="M4 20h4L19 9l-4-4L4 16v4Z" /></svg>;
export const IconPin = (p) => <svg {...base} {...p}><path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10Z" /><circle cx="12" cy="11" r="2" /></svg>;
export const IconTrash = (p) => <svg {...base} {...p}><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13" /></svg>;

/* Ikon sosial (solid) */
const solid = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
export const IconFacebook = (p) => <svg {...solid} {...p}><path d="M14 8.5V7c0-.7.3-1 1-1h2V3h-3a4 4 0 0 0-4 4v1.5H7V12h3v9h4v-9h2.7l.6-3.5H14Z" /></svg>;
export const IconTwitter = (p) => <svg {...base} strokeWidth={2.2} {...p}><path d="M5 4l14 16M19 4 5 20" /></svg>;
export const IconInstagram = (p) => <svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></svg>;
export const IconYoutube = (p) => <svg {...solid} {...p}><path fillRule="evenodd" d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm6 3v6l5-3-5-3Z" /></svg>;
export const IconPinterest = (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M10.500 20.500 12 13m-1.500-1.500a2.500 2.500 0 1 1 3.500 2.300" /></svg>;
