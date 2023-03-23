const { log } = require("./util")

exports.loginSocialCallback = async ({ callback, accessToken, refreshToken }) => {
  let redirectTo = (callback || 'https://localhost:3000') + '/oauth-callback'
  log("OAUTH callback", callback)
  redirectTo += `?access_token=${accessToken}&refreshToken=${refreshToken}`
  log(redirectTo)
  return Promise.resolve(redirectTo)
}
