import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'

import '../styles/sweetalert.scss'

interface SwalConfirmProps {
  title: string
  text: string
  icon?: SweetAlertIcon
}

interface SwalToastProps {
  title: string
  text?: string
  icon?: SweetAlertIcon
  position?: SweetAlertPosition
  timer?: number
}

// Promise<SweetAlertResult<Awaited<T>>>;
export const SwalConfirm = (props: SwalConfirmProps) => {
  const icon = props.icon || 'info'

  return Swal.fire({
    title: props.title,
    text: props.text,
    icon: icon,
    allowEnterKey: false,
    showCancelButton: true,
    showConfirmButton: true,
    focusCancel: true,
    focusConfirm: false,
  })
}

export const SwalToast = (props: SwalToastProps) => {
  const icon = props.icon || 'info'
  const position = props.position || 'bottom-right'
  const timer = props.timer || 3000
  const text = props.text || ''

  return Swal.fire({
    title: props.title,
    text: text,
    icon: icon,
    toast: true,
    timerProgressBar: true,
    position: position,
    timer: timer,
    showConfirmButton: false,
  })
}
