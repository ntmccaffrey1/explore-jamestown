export default function PlusIcon({ className = "plus" }) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={ className }
      >
      <path
        d="M10 3V17M3 10H17"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  )
}