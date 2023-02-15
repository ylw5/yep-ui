let id = 0
function generateId() {
  return id++
}
export function useOptionId() {
  return generateId()
}
