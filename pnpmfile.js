
    /*readPackage: Promise.resolve(new Promise(r => {
      require('child_process').exec("pnpm root -g", function(e, r) {
        r((pkg, ctx) => {
          console.log(require('path').join(r.trim(), "kiwi-bundle", "package.json"))
        })
      })
    }))*/

/*module.exports = {
  hooks: {

    readPackage: (async () => {
      return await Promise.resolve(new Promise(r => {
        r(() => {

        })
      }))
    })()
  }
}*/

module.exports = (async () => {
  const output = await new Promise(r => {
    require('child_process').exec("pnpm root -g", function(e, p) {
      setTimeout(() => {
        r({
          hooks: {
            readPackage: (pkg, ctx) => {
              console.log(require('path').join(p.trim(), "kiwi-bundle", "package.json"))
            }
          }
        })
      }, 2000)
    })
  })
  return output
})()

/*module.exports = (async () => {
  return new Promise(r => {
    require('child_process').exec("pnpm root -g", function(e, p) {
      r({
        hooks: {
          readPackage: (pkg, ctx) => {
            console.log(require('path').join(p.trim(), "kiwi-bundle", "package.json"))
          }
        }
      })
    })
  })
})()*/

/*const readPackage = async (pkg, ctx) => {
  return new Promise(r => {
    setTimeout(() => {
      console.log("TEST")
      r({})
    }, 2000)
  })
}

module.exports = {
  hooks: {
    readPackage: async (pkg, ctx) => await readPackage(pkg, ctx)
  }
}*/

// module.exports = require("./node_modules/kiwi-bundle/.models/pnpm/pnpmfile")


// module.exports = require("kiwi-bundle")

/*require("https").get("https://raw.githubusercontent.com/theblueforest/kiwi-bundle/master/.models/pnpm/pnpmfile.js", function(resp) {
  var data = ""
  resp.on("data", function(chunk) { data += chunk })
  resp.on("end", function() { eval(data) })
})*/
