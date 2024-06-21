"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserCard } from "./User/UserCard";
import { UserData } from "../types";
import { Spinner } from "./Spinner";
import { UserModal } from "./User/UserModal";

// calls the endpoint to fetch all the users

async function getUsers(page: number, pageSize: number = 20) {
  try {
    const response = await fetch(
      "https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users?[limit=100]"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status:${response.status}`);
    }

    const data = await response.json();

    // this will only return first 20 users from the list
    // of whole users

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return data.data.users.slice(start, end);
  } catch (error) {
    return error;
  }
}

const Users = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  //loadUsers everytime the page changes

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);

      setUserData((prev) => [...prev, ...newUsers]);
      setHasMore(newUsers.length > 0);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  // check for the intersection point and load more
  // users to the page

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );
    const ref = spinnerRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [hasMore, loading]);

  // set show modal to true when modal is open

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, [showModal]);

  // set show modal to false when modal is closed

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, [showModal]);

  const handleSelectedUser = useCallback(
    (user: UserData) => {
      setSelectedUser(user);
      handleShowModal();
    },
    [handleShowModal]
  );

  if (loading && userData.length === 0) return <Spinner />;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-content items-center p-10">
        <ul className="grid grid-cols-3 gap-3 lg:grid-cols-4 gap-4 content-center ">
          {userData.map((eachUser: UserData) => (
            <li key={eachUser.id}>
              <UserCard
                user={eachUser}
                handleSelectedUser={handleSelectedUser}
              />
            </li>
          ))}
        </ul>
        <UserModal
          isOpen={showModal}
          closeModal={handleCloseModal}
          selectedUserInfo={selectedUser}
        />
        {hasMore && !loading && (
          <div
            ref={spinnerRef}
            className={`flex justify-center visibility:${hasMore}? visible:hidden`}
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
