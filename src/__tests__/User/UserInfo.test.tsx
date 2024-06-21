import { render, screen, cleanup } from "@testing-library/react";
import { UserInfo } from "@/components/User/UserInfo";

describe("User Basic Info Component", () => {
  const firstName = "Gursimrat";
  const lastName = "kaur";
  const joiningDate = "01/07/2024";
  const role = "Frontend Engineer";
  const username = "gursimratio";
  const email = "gursimrat100+@gmail.com";

  beforeEach(() => {
    render(
      <UserInfo
        firstName={firstName}
        lastName={lastName}
        joiningDate={joiningDate}
        username={username}
        role={role}
        email={email}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("show proper user basic info", () => {
    const userFullName = screen.getByTestId("fullname");
    const userUsername = screen.getByTestId("username");
    const joiningDate = screen.getByTestId("joining-date");
    const userRole = screen.getByTestId("role");
    const userEmail = screen.getByTestId("email");

    expect(userFullName).toBeInTheDocument();
    expect(userUsername).toBeInTheDocument();
    expect(joiningDate).toBeInTheDocument();
    expect(userRole).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });
});
