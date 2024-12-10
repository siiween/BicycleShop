import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg md:w-1/2 w-full max-h-full">
        <div className="flex justify-between items-center border-b border-neutral-300 p-5">
          <Text as="h2" size="2xl" variant="primary" className="font-bold">
            {title || 'Modal'}
          </Text>
          <Button onClick={onClose}>Close</Button>
        </div>
        <div className="max-h-2/3 overflow-y-scroll px-5 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
