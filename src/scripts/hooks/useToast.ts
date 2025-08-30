import { toast } from 'react-toastify';
import { Translation } from '@/Translations';

export function useToast() {
  const showAbsolveToast = (messageKey: string) => {
    toast.success(Translation.translate(messageKey), {
      position: 'top-right',
      autoClose: 3000,
      draggable: true,
      pauseOnHover: false,
    });
  };

  const showUndoToast = (messageKey: string) => {
    toast.success(Translation.translate(messageKey), {
      icon: () => '🗑',
      position: 'top-right',
      autoClose: 3000,
      draggable: true,
      pauseOnHover: false,
    });
  };

  return { showAbsolveToast, showUndoToast };
}
