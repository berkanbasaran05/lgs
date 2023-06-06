import React, { FC, ReactNode } from 'react';
import { Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const customSwal = MySwal.mixin({
  customClass: {
    actions: 'flex !mt-2 justify-center',
    confirmButton:
      'px-4 mx-1 py-2 text-sm bg-brand-palette-primary font-medium text-white rounded',
    cancelButton:
      'px-4 mx-1 py-2 text-sm bg-brand-black-secondary font-medium text-white rounded'
  },
  buttonsStyling: false
});
interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ children, isOpen, onClose }) => {
  return (
    <Transition
      className={
        'fixed min-w-[360px] overflow-hidden z-[99] bg-[rgba(31,32,39,0.6)] bg-opacity-40 inset-0'
      }
      as="div"
      show={isOpen}>
      <Transition.Child
        enter="transition-transform duration-300"
        enterFrom="translate-x-[100%]"
        enterTo="translate-x-[0px]"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-[0px]"
        leaveTo="translate-x-[100%]"
        as="div"
        className={`w-full max-w-xl right-0 absolute overflow-y-auto bg-white h-full shadow-2xl`}>
        {children}
      </Transition.Child>
      <div
        className="md:block hidden w-full h-full "
        onClick={() => {
          customSwal
            .fire({
              html: '<div><h4 class="text-xl font-semibold">Bu işlemi yapmak istediğinize emin misiniz?</h4><p class="text-sm">Devam ederseniz ...</p></div>',
              showCancelButton: true,
              showClass: {
                popup: 'animate-enter'
              },
              hideClass: {
                popup: 'animate-leave'
              },
              width: 300,
              confirmButtonText: 'Devam Et!',
              cancelButtonText: 'İptal Et!'
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                onClose();
              }
            });
        }}
      />
    </Transition>
  );
};
export default Drawer;
