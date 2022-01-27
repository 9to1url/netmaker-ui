const validNetworkNames = [
  'network',
  'net',
  'dev',
  'dev-net',
  'office',
  'office-vpn',
  'netmaker-vpn',
  'securoserv',
  'quick',
  'long',
  'private',
  'my-net',
  'it-dept',
  'test-net',
  'kube-net',
]

export const genRandomNumber = (size: number, inclusive: boolean) => {
  if (inclusive) {
    return Math.floor(Math.random() * size + 1)
  }
  return Math.floor(Math.random() * size)
}

export const randomCIDR = () =>
  `10.${genRandomNumber(254, true)}.${genRandomNumber(254, true)}.0/24`

export const randomNetworkName = () =>
  validNetworkNames[genRandomNumber(validNetworkNames.length, false)]

export const copy = (text: string) => navigator.clipboard.writeText(text)

// export const decode64 = (str: string): string =>
//   Buffer.from(str, 'base64').toString('binary')
// export const encode64 = (str: string): string =>
//   Buffer.from(str, 'binary').toString('base64')

export const getCommaSeparatedArray = (values: string) => {
  const newArray = values.split(',')
  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = newArray[i].trim()
  }
  return newArray as []
}

// Returns level of health of a node
// 2 - unhealthy (hasn't checked in for 30 min)
// 1 - warning (hasn't checked in for 5 min)
// 0 - healthy
export const isNodeHealthy = (lastCheckinTime: number) => {
  const time = Date.now() / 1000
  if (time - lastCheckinTime >= 1800)
    return 2
  if (time - lastCheckinTime >= 300)
    return 1
  return 0
}
