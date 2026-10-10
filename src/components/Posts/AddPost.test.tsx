import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { toast } from "react-toastify"
import { apiSlice } from "../../app/features/api/apiSlice"
import AddPost from "./AddPost"

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}))

function renderAddPost() {
  const store = configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <AddPost />
      </MemoryRouter>
    </Provider>
  )
}

describe("AddPost", () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    vi.mocked(toast.success).mockClear()
    vi.mocked(toast.warning).mockClear()
  })

  it("submits the form and shows a success toast", async () => {
    const user = userEvent.setup()
    renderAddPost()

    await user.type(screen.getByLabelText("Title"), "My first post")
    await user.type(screen.getByLabelText("Body"), "Some content")
    await user.click(screen.getByRole("button", { name: "Add Post" }))

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Post added successfully")
    )
  })

  it("shows a warning toast and does not submit when fields are empty", async () => {
    const user = userEvent.setup()
    renderAddPost()

    await user.click(screen.getByRole("button", { name: "Add Post" }))

    expect(toast.warning).toHaveBeenCalledWith(
      "Please fill in both title and body!"
    )
  })
})
