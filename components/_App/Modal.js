import { motion } from 'framer-motion';
import { background, motionModal } from '../../utils/animations';

function Modal({ children }) {
  return (
    <motion.div
      className="modal"
      variants={background}
      animate="visible"
      initial="hidden"
      exit="hidden"
    >
      <motion.div
        className="modal__inner"
        variants={motionModal}
        initial="hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
