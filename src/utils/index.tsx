export function shortenHexString(hexString) {
  let start = hexString.substring(0, 4)
  let end = hexString.substring(hexString.length - 4)
  return start + "..." + end
}
