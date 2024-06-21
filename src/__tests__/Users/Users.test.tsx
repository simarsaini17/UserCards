import {
  render,
  screen,
  waitFor,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";
import Users from "@/components/Users";
import userEvent from "@testing-library/user-event";
import { jsonMock } from "../../__mocks__/jsonMock";
import fetchMock from "jest-fetch-mock";
import "../../__mocks__/ intersectionObserverMock";

describe("User Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders loading spinner initially", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: { users: [] } }));
    render(<Users />);
    await waitFor(() =>
      expect(screen.getByTestId("spinner")).toBeInTheDocument()
    );
  });

  it("renders user list after fetch", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: { users: jsonMock } }));

    render(<Users />);

    jsonMock.forEach(async (user) => {
      await waitFor(() =>
        expect(screen.getByTestId(`user-avatar-${user.id}`)).toBeInTheDocument()
      );
    });
  });
  test('opens modal with user details when clicking "View More"', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: { users: jsonMock } }));

    render(<Users />);

    const viewMoreButtons = await waitFor(() =>
      screen.getAllByTestId("view-more-details")
    );

    userEvent.click(viewMoreButtons[0]);

    await waitFor(() =>
      expect(screen.getByTestId("modal")).toBeInTheDocument()
    );

    expect(
      screen.getByText(`${jsonMock[0].firstname} ${jsonMock[0].lastname}`)
    ).toBeInTheDocument();
  });
});
