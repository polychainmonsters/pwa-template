export const animateVariants = {
  hidden: {
    y: "100%", // move it off-screen vertically
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  visible: {
    y: "0%", // back to its original position
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
