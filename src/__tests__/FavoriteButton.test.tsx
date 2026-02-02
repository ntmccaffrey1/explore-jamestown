import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FavoriteButton from "@/components/buttons/FavoriteButton/FavoriteButton"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}))

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("FavoriteButton", () => {
  test("shows login modal when logged out", async () => {
    const user = userEvent.setup()

    render(
      <FavoriteButton
        placeId="123"
        title="Test Place"
        isLoggedIn={false}
      />
    )

    await user.click(screen.getByRole("button"))

    expect(
      await screen.findByText(/log in to add your favorites/i)
    ).toBeInTheDocument()
  })

  test("toggles favorite when user is logged in", async () => {
    const user = userEvent.setup()

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ favorited: true }),
    })

    const onToggle = jest.fn()

    render(
      <FavoriteButton
        placeId="place-1"
        title="Test Place"
        isLoggedIn={true}
        active={false}
        onToggle={onToggle}
      />
    )

    const button = screen.getByRole("button", {
      name: /toggle favorite/i,
    })

    await user.click(button)

    expect(fetch).toHaveBeenCalledWith(
      "/api/favorites/toggle",
      expect.objectContaining({
        method: "POST",
      })
    )

    expect(onToggle).toHaveBeenCalledWith(true)
  })
})