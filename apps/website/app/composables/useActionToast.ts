function _useActionToast() {
  const toast = useToast()
  const id = ref(useId())

  function start() {
    toast.add({
      id: id.value,
      title: 'В процессе',
      description: 'Данные сейчас обновятся',
      icon: 'i-lucide-loader-circle',
      duration: 120000,
      ui: {
        icon: 'animate-spin',
      },
    })
  }

  function success(title: string) {
    toast.update(id.value, {
      title,
      description: undefined,
      icon: 'i-lucide-check',
      color: 'success',
      duration: 3000,
      ui: {
        icon: '',
      },
    })
  }

  function error(description: string = 'Что-то пошло не так') {
    toast.update(id.value, {
      title: 'Ошибка',
      icon: 'i-lucide-x',
      color: 'error',
      description,
      duration: 5000,
      ui: {
        icon: '',
      },
    })
  }

  return {
    id: id.value,
    start,
    success,
    error,
  }
}

export const useActionToast = createSharedComposable(_useActionToast)
