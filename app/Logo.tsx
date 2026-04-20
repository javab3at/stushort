export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 56"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stu Short Photography"
    >
      <title>Stu Short Photography</title>
      <g
        transform="translate(4 4)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="22" cy="22" r="14" strokeWidth="1.6" opacity="0.9" />
        <path
          d="M24 10 L16 23 L22 23 L18 34"
          strokeWidth="2.2"
        />
        <line x1="0" y1="44" x2="44" y2="44" strokeWidth="1.6" />
      </g>
      <g fill="currentColor">
        <text
          x="58"
          y="32"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontWeight="700"
          fontSize="22"
          textLength="138"
          lengthAdjust="spacing"
        >
          STU SHORT
        </text>
        <text
          x="58"
          y="48"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontWeight="500"
          fontSize="8"
          textLength="138"
          lengthAdjust="spacing"
          opacity="0.6"
        >
          PHOTOGRAPHY
        </text>
      </g>
    </svg>
  );
}
