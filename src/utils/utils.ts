export function tempoPassado(timestamp) {
  const start = new Date(timestamp)
  const now = new Date()
  const diff = now - start

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `Há ${days} dia${days > 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `Há ${hours} hora${hours > 1 ? 's' : ''}`
  } else if (minutes > 0) {
    return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`
  } else {
    return `Há ${seconds} segundo${seconds > 1 ? 's' : ''}`
  }
}

export function geraMensagem(dataString) {
  const data = new Date(dataString)
  const meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ]
  const mes = meses[data.getUTCMonth()]
  const ano = data.getUTCFullYear()

  return `Entrou em ${mes} ${ano}`
}
