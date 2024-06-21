import Image from "next/image";
import { UserData } from "../../types";
import { SyntheticEvent, useCallback } from "react";

interface UserCardProps {
  user: UserData;
  handleSelectedUser: (user: UserData) => void;
}

export const UserCard = ({ user, handleSelectedUser }: UserCardProps) => {
  // set selected user
  const handleClickViewMore = useCallback(
    (event: SyntheticEvent, user: UserData) => {
      event.stopPropagation();
      handleSelectedUser(user);
    },
    [user]
  );

  return (
    <div className="flex flex-col xl:h-96 xl:w-80 h-80 w-60 rounded-3xl bg-indigo-600 shadow-lg justify-center">
      <div className="flex justify-center items-center w-auto basis-3/6 rounded-bl-3xl">
        <div
          data-testid={`user-avatar-${user.id}`}
          className="w-36 h-36 rounded-full overflow-hidden border-2 border-white px-1 py-1"
        >
          <Image
            data-testid="user-avatar"
            src={user.avatar}
            alt={user.firstname}
            width={200}
            height={200}
            className="object-center rounded-full mx-auto"
          />
        </div>
      </div>
      <div className="text-center text-black h-1/2 rounded-b-3xl rounded-tr-3xl bg-white p-4">
        <h3 className="text-xl font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
        <button
          data-testid="view-more-details"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg curosor-grab"
          onClick={(event) => handleClickViewMore(event, user)}
        >
          View More
        </button>
      </div>
    </div>
  );
};
