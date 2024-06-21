interface UserInfoProps {
  firstName: string;
  lastName: string;
  username: string;
  joiningDate: string;
  role: string;
  email: string;
}

export const UserInfo = ({
  firstName,
  lastName,
  username,
  joiningDate,
  role,
  email,
}: UserInfoProps) => {
  return (
    <>
      <span data-testid="fullname">FullName: {`${firstName} ${lastName}`}</span>
      <span data-testid="username">Username: {username}</span>
      <span data-testid="joining-date">Joining Date: {joiningDate}</span>
      <span data-testid="role">Role: {role}</span>
      <span data-testid="email">Email: {email}</span>
    </>
  );
};
