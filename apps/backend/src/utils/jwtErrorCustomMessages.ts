interface JwtErrorCustomMessagesI {
  badRequestErrorMessage: string
  badCookieRequestErrorMessage: string
  noAuthorizationInHeaderMessage: string
  noAuthorizationInCookieMessage: string
  authorizationTokenExpiredMessage: string
  authorizationTokenUntrusted: string
  authorizationTokenUnsigned: string
  authorizationTokenInvalid: (err: Error) => string
}

export const jwtErrorCustomMessages: JwtErrorCustomMessagesI = {
  badRequestErrorMessage: "Format is Authorization: Bearer [token]",
  badCookieRequestErrorMessage: "Cookie could not be parsed in request",
  noAuthorizationInHeaderMessage:
    "No Authorization was found in request.headers",
  noAuthorizationInCookieMessage:
    "No Authorization was found in request.cookies",
  authorizationTokenExpiredMessage: "Authorization token expired",
  authorizationTokenUntrusted: "Untrusted authorization token",
  authorizationTokenUnsigned: "Unsigned authorization token",
  authorizationTokenInvalid: (err) => {
    return `Authorization token is invalid: ${err.message}`
  },
}
