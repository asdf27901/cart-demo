
export function getLocalItem(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setLocalItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function delLocalItem(key) {
  localStorage.removeItem(key)
}

export function getSessionItem(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function delSessionItem(key) {
  sessionStorage.removeItem(key)
}
