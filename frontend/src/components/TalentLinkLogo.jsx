export const TalentLinkLogo = ({
  className = "w-48",
}) => {
  return (
    <svg
      className={`${className} text-gray-900 dark:text-white overflow-visible`}
      viewBox="-10 -10 280 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TalentLink Logo"
    >
      <title>TalentLink Logo</title>

      <defs>
        {/* Soft blue glow */}
        <filter
          id="blueGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="5"
            floodColor="#3B82F6"
            floodOpacity="0.35"
          />
        </filter>

        {/* Card shadow */}
        <filter
          id="cardShadow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="8"
            floodColor="#000000"
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      {/* ICON */}
      <g filter="url(#blueGlow)">
        <rect
          width="60"
          height="60"
          rx="16"
          className="fill-white dark:fill-gray-800"
          filter="url(#cardShadow)"
        />

        <line
          x1="20"
          y1="22"
          x2="40"
          y2="22"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <line
          x1="30"
          y1="22"
          x2="30"
          y2="40"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <line
          x1="30"
          y1="40"
          x2="40"
          y2="40"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle cx="20" cy="22" r="3.8" fill="#2563EB" />
        <circle cx="40" cy="22" r="3.8" fill="#2563EB" />
        <circle cx="30" cy="40" r="3.8" fill="#2563EB" />
      </g>

      {/* TEXT */}
      <text
        x="72"
        y="34"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="currentColor"
        dominantBaseline="middle"
        style={{
          filter: "drop-shadow(0px 2px 4px rgba(59,130,246,0.18))",
        }}
      >
        Talent
        <tspan fill="#3B82F6">Link</tspan>
      </text>
    </svg>
  );
};