import { UserData } from "@/types";
import { Modal } from "../Modal/Modal";
import Image from "next/image";
import { UserInfo } from "./UserInfo";

type UserModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  selectedUserInfo: UserData | null;
};

export const UserModal = ({
  isOpen,
  closeModal,
  selectedUserInfo,
}: UserModalProps) => {
  return (
    // show info when there is selected user
    <Modal isOpen={isOpen} onClose={closeModal}>
      {selectedUserInfo && (
        <div className="flex flex-col items-center w-96 text-gray-700 font-sans">
          <div className="flex flex-row justify-around items-center gap-4">
            <Image
              data-testid="user-modal-avatar"
              src={selectedUserInfo.avatar}
              alt={selectedUserInfo.firstname}
              width={125}
              height={125}
              className="rounded-full border-2"
            />
            <div className="flex flex-col font-semibold text-nowrap">
              <UserInfo
                firstName={selectedUserInfo.firstname}
                lastName={selectedUserInfo.lastname}
                username={selectedUserInfo.username}
                email={selectedUserInfo.email}
                role={selectedUserInfo.role}
                joiningDate={selectedUserInfo.join_date}
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 bg-slate-200 p-4 rounded-lg ">
            <p>{selectedUserInfo.description}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};
