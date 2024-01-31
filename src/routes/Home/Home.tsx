import React, { useContext, useState } from "react";

import { Button, ModalProfile, ProfilePicture } from "../../components";
import { UserContext } from "../../context";
import { useEmbeddedWallet } from "../../hooks";

export const Home: React.FC = () => {
  const { user, userName } = useContext(UserContext)!;

  const { enoughFunds } = useEmbeddedWallet(user);

  const [modalProfileVisibility, setModalProfileVisibility] = useState(false);

  return (
    <>
      <div className="flex flex-1 flex-col bg-no-repeat bg-cover bg-center bg-fixed bg-background-intro">
        <div className="flex flex-1 flex-col px-4 py-safe-or-4 bg-black/50 backdrop-blur-sm">
          <div className="flex flex-row justify-between">
            <Button
              size="xs"
              variant="light"
              className="w-10 h-10 shadow-lg"
              onClick={() => window.open("https://github.com", "_blank")}
            >
              <i className="material-symbols-rounded text-lg">question_mark</i>
            </Button>
            <div className="flex flex-row space-x-2">
              <ProfilePicture
                size={40}
                onClick={() => setModalProfileVisibility(true)}
              />
            </div>
          </div>

          <div className="flex flex-1 justify-center items-center space-x-4 flex-row overflow-visible"></div>
          {!enoughFunds?.eth && (
            <span className="text-xs text-center text-text-light mb-2">
              Oops! Looks like your gas treasure chest is a bit light.
            </span>
          )}
        </div>
      </div>
      <ModalProfile
        isVisible={modalProfileVisibility}
        walletAddress={user}
        userName={userName}
        onClose={() => setModalProfileVisibility(false)}
      />
    </>
  );
};
