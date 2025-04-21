type ToastProps = {
  title: string
  description: string
  duration?: number
}

export function toast(props: ToastProps) {
  // In a real implementation, this would show a toast notification
  console.log(`Toast: ${props.title} - ${props.description}`)

  // For demo purposes, we'll use browser's alert
  alert(`${props.title}\n${props.description}`)
}
