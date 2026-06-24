/* logo.jsx — Kent Chong "KC" monogram mark + wordmark.
   The mark is a single-fill glyph using currentColor so it themes per direction. */

const { useRef: _logoUseRef, useEffect: _logoUseEffect } = React;

// The KC glyph geometry (viewBox 0 0 100 100). Use as a child of <svg>.
function KCGlyph() {
  return (
    <g fill="currentColor">
      <rect x="18" y="22" width="12" height="56" />
      <polygon points="30,50 50,22 64,22 40,50" />
      <polygon points="30,50 50,78 64,78 40,50" />
      <path d="M88 34 A22 22 0 1 0 88 66 L80 56 A12 12 0 1 1 80 44 Z" />
    </g>
  );
}

// Square logo mark — Kent's own hand-lettered brand badge.
function KCMark({ size = 38, className = "" }) {
  return (
    <img className={"kc-logo " + className} src="assets/logo.svg"
         width={size} height={size} alt="Kent Chong" draggable="false" />
  );
}

// Full wordmark lockup: badge + name.
function KCWordmark({ markSize = 32 }) {
  return (
    <span className="kc-wordmark">
      <KCMark size={markSize} />
      <span className="kc-name">Kent Chong</span>
    </span>
  );
}

Object.assign(window, { KCGlyph, KCMark, KCWordmark });
