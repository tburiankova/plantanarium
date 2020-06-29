import { motion } from 'framer-motion';
import { background, motionModal } from '../../utils/animations';

function Modal({ handleDelete, modal, setModal }) {
  return (
    <motion.div
      className="product__modal"
      variants={background}
      animate="visible"
      initial="hidden"
      exit="hidden"
      key={modal}
    >
      <motion.div
        className="product__modal--inner"
        variants={motionModal}
        initial="hidden"
        key={modal}
      >
        <p>Are you sure you want to delete this product?</p>
        <div className="product__modal__btns">
          <button className="btn-cancel" onClick={() => setModal(!modal)}>
            Cancel
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
