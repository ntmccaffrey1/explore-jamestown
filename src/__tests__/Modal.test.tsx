import { render, screen, fireEvent, act } from "@testing-library/react"
import Modal from "@/components/modals/Modal"

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe("Modal", () => {
  test("renders children", () => {
    render(
      <Modal onClose={jest.fn()}>
        {() => <div>Modal content</div>}
      </Modal>
    )

    expect(screen.getByText("Modal content")).toBeInTheDocument()
  })

  test("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn()

    render(
      <Modal onClose={onClose}>
        {() => <div>Modal content</div>}
      </Modal>
    )

    act(() => {
      fireEvent.click(document.querySelector(".modal-overlay")!)
      jest.runAllTimers()
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test("closes when Escape is pressed", () => {
    const onClose = jest.fn()

    render(
      <Modal onClose={onClose}>
        {() => <div>Modal content</div>}
      </Modal>
    )

    act(() => {
      fireEvent.keyDown(window, { key: "Escape" })
      jest.runAllTimers()
    })

    expect(onClose).toHaveBeenCalled()
  })
})
