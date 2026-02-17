export default function ArrowIcon({ className = "arrow" }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.354 2.646 13.707 8l-5.353 5.354-.708-.707L11.793 8.5H2v-1h9.793L7.646 3.354z"
        fill="currentColor"
      />
    </svg>
  )
}