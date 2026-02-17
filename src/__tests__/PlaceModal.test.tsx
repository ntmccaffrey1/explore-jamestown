/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent } from "@testing-library/react"
import PlaceModal from "@/components/modals/PlaceModal"

jest.mock("@/components/buttons/FavoriteButton/FavoriteButton", () => ({
  __esModule: true,
  default: () => <button aria-label="favorite" />,
}))

jest.mock("@/components/socials/SocialIcons", () => ({
  __esModule: true,
  default: () => null,
  SOCIAL_ICONS: {},
}))

jest.mock("@/components/icons/XIcon/XIcon", () => ({
  __esModule: true,
  XIcon: () => <span>X</span>,
}))

describe("PlaceModal", () => {
  const basePlace = {
    id: "1",
    name: "Test Place",
    description: "Great food",
    address: "123 Main St",
    isFavorited: false,
  } as any

  test("renders place name and description", () => {
    render(
      <PlaceModal
        place={basePlace}
        isLoggedIn={false}
        onClose={jest.fn()}
        onFavoriteToggle={jest.fn()}
      />
    )

    expect(screen.getByText("Test Place")).toBeInTheDocument()
    expect(screen.getByText("Great food")).toBeInTheDocument()
  })

  test("renders address when provided", () => {
    render(
      <PlaceModal
        place={basePlace}
        isLoggedIn={false}
        onClose={jest.fn()}
        onFavoriteToggle={jest.fn()}
      />
    )

    expect(screen.getByText("123 Main St")).toBeInTheDocument()
  })

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn()

    render(
      <PlaceModal
        place={basePlace}
        isLoggedIn={false}
        onClose={onClose}
        onFavoriteToggle={jest.fn()}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})