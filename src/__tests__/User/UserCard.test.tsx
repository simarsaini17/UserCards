import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { UserCard } from "@/components/User/UserCard";
import { act } from "react";

describe("User Card Info Component", () => {
  const user = {
    id: "4348814a-4ab9-4302-b1a0-93b6910080e0",
    username: "rgatfield1",
    firstname: "Rouvin",
    lastname: "Gatfield",
    email: "rgatfield1@state.gov",
    avatar: "https://robohash.org/utcorruptiducimus.png?size=50x50&set=set1",
    role: "Engineer",
    join_date: "2/28/2024",
    description: "Ut tellus. Nulla ut erat id mauris vulputate.",
  };

  afterEach(() => {
    cleanup();
  });

  it("display information correctly", async () => {
    const handleSelectedUser = jest.fn();
    render(<UserCard user={user} handleSelectedUser={handleSelectedUser} />);
    const image = screen.getByTestId("user-avatar");
    expect(image).toBeInTheDocument();
    expect(
      screen.getByText(`${user.firstname} ${user.lastname}`)
    ).toBeInTheDocument();

    expect(screen.getByTestId("view-more-details")).toBeInTheDocument();
  });

  it("check if function is being called on user", async () => {
    const handleSelectedUser = jest.fn();

    render(<UserCard user={user} handleSelectedUser={handleSelectedUser} />);
    const button = screen.getByTestId("view-more-details");

    act(() => {
      fireEvent.click(button);
    });

    expect(handleSelectedUser).toHaveBeenCalled();
  });
});
