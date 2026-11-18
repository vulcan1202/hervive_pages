import { ref } from 'vue'

export interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

const toasts = ref<ToastItem[]>([])
let counter = 0

export const useToast = () => {
  const show = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3500) => {
    const id = ++counter
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
  }

  const remove = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    show,
    success: (msg: string, d?: number) => show(msg, 'success', d),
    error: (msg: string, d?: number) => show(msg, 'error', d),
    info: (msg: string, d?: number) => show(msg, 'info', d),
    remove
  }
}
