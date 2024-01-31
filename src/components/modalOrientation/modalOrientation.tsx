import { motion } from "framer-motion";

import { Modal } from "../modal";
import { transitions, variants } from "./modalOrientationMotion";

export const ModalOrientation = () => {
  return (
    <Modal isVisible>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-1 justify-center items-center bg-no-repeat bg-cover bg-center bg-fixed bg-background-default">
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions}
          className="flex p-2 rounded-2xl w-half aspect-[16/9] bg-background-primary/60 backdrop-blur-xl border border-background-primary/20 shadow-lg"
        >
          <div className="flex flex-1 flex-col p-4 rounded-xl bg-background-primary border border-background-primary/20 shadow-sm">
            <div className="flex flex-1 flex-col space-y-8 justify-center text-center">
              <h1 className="font-display font-black text-2xl">
                Portrait Mode Preferred!
              </h1>
              <div className="space-y-8 text-text-secondary">
                <p>
                  For the best experience, please switch to{" "}
                  <strong>portrait mode.</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};
