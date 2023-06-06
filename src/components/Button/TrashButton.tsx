import React, { Dispatch, FC, SetStateAction } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosInstance from 'src/utils/axiosInstance';
import Button from './Button';

const MySwal = withReactContent(Swal);
interface TrashBtnProps {
  endpoint: string;
  onSuccess: () => void;
  loadingDelete: boolean;
  setLoadingDelete: Dispatch<SetStateAction<boolean>>;
}

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

const TrashButton: FC<TrashBtnProps> = ({
  onSuccess,
  loadingDelete,
  setLoadingDelete,
  endpoint
}) => {
  return (
    <Button
      disabled={loadingDelete}
      onClick={() => {
        customSwal
          .fire({
            html: '<div><h4 class="text-xl font-semibold">Silme işlemi yapmak istediğinize emin misiniz?</h4><p class="text-sm">Devam ederseniz tekrar açılacak panelde işlemi onaylayabilirsiniz.</p></div>',
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
              setTimeout(() => {
                customSwal
                  .fire({
                    html: '<div><h4 class="text-xl font-semibold">Silme İşlemine Devam Etmek İstiyor Musun?</h4><p class="text-sm">Bunu geri alamazsınız!</p></div>',
                    showCancelButton: true,
                    showClass: {
                      popup: 'animate-enter'
                    },
                    hideClass: {
                      popup: 'animate-leave'
                    },
                    width: 300,
                    confirmButtonText: 'Evet, Sil!',
                    cancelButtonText: 'Hayır, İptal Et!'
                  })
                  .then(async (result) => {
                    if (result.isConfirmed) {
                      setLoadingDelete(true);
                      axiosInstance
                        .delete(endpoint)
                        .then(() => {
                          onSuccess();
                          toast.success('Silme İşlemi Başarılı');
                        })
                        .catch((err) => {
                          toast.error(err.response.data.message);
                        })
                        .finally(() => setLoadingDelete(false));
                    }
                  });
              }, 300);
            }
          });
      }}
      className={`lg:hover:bg-brand-red-primaryLight w-7 h-7 rounded text-brand-red-primary border border-brand-red-primary`}>
      <TrashIcon className="w-3.5 h-3.5" />
    </Button>
  );
};

export default TrashButton;
