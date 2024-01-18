export const random = (max = 20) => Math.floor(Math.random() * max) + 1

export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error'
}
