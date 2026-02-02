import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import GridCard from "@/components/grid/GridCard"

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: () => ({ data: null, status: "unauthenticated" }),
}))

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}))

jest.mock("@/components/modals/LoginPromptModal", () => ({
  __esModule: true,
  default: () => null,
}))

describe("GridCard", () => {
  it("renders place name", () => {
    render(
      <GridCard
        place={{
          id: "1",
          name: "Test Place",
          description: "Nice place",
        } as any}
        isLoggedIn={false}
      />
    )

    expect(screen.getByText("Test Place")).toBeInTheDocument()
  })

  it("calls onClick when card is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <GridCard
        place={{ id: "1", name: "Test Place" } as any}
        isLoggedIn={false}
        onClick={handleClick}
      />
    )

    await user.click(screen.getByText("Test Place"))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("does not trigger card onClick when favorite button is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <GridCard
        place={{ id: "1", name: "Test Place" } as any}
        isLoggedIn={false}
        onClick={handleClick}
      />
    )

    const favoriteButton = screen.getByRole("button", {
      name: /toggle favorite/i,
    })

    await user.click(favoriteButton)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("renders description and address when provided", () => {
    render(
      <GridCard
        place={{
          id: "1",
          name: "Test Place",
          description: "Great food",
          address: "123 Main St",
        } as any}
        isLoggedIn={false}
      />
    )

    expect(screen.getByText("Great food")).toBeInTheDocument()
    expect(screen.getByText("123 Main St")).toBeInTheDocument()
  })

  it("does not render description if none is provided", () => {
    render(
      <GridCard
        place={{ id: "1", name: "Test Place" } as any}
        isLoggedIn={false}
      />
    )

    expect(screen.queryByText("Great food")).not.toBeInTheDocument()
  })
})