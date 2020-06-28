const path = require('path')
const fs = require('fs')

const apps = fs.readdirSync(path.resolve(__dirname, "apps"))

const entry = {}
apps.forEach(app => {
  entry[app] = path.resolve(__dirname, "apps", app, 'index.js')
})
module.exports = {
  entry,
  output : {
    filename : '[name].js'
  },
  devtool : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test : /\.css$/,
        use :  ["style-loader", "css-loader"]
      }
    ]
  },
  devServer : {
    contentBase : path.resolve(__dirname, "static"),
    watchOptions : {
      poll : true
    },
    before : (app) => {
      app.get('/', (req, res) => {
        let content = fs.readFileSync( path.resolve(__dirname, 'index.html') , 'utf-8')
        const menuStr = apps.map(app => `<li><a class='menu-item' data-link='${app}'>${app}</a></li>`).join('\n')
        content = content.replace("__MENU__", menuStr) 

        res.send(content)
      })

      apps.forEach(dir => {
        app.get('/' + dir, (req,res) => {
          let content = fs.readFileSync(path.resolve(__dirname, 'apps', dir, "index.html"), 'utf-8')
          content = content.replace("__APP__", dir)

          function replaceShader(pattern, base) {
            const reg = new RegExp(pattern)
            if (content.match(reg)) {
              const regWithName = new RegExp(pattern +"\\((.*)\\)")
              const m = content.match(
                regWithName
              )
              let name = base + ".glsl"
              let short = ''
              if (m && m[1]) {
                short = m[1]
                name = base + "-" + m[1] + ".glsl"
              }

              const program = fs.readFileSync(
                path.resolve(
                  __dirname,
                  "apps",
                  dir,
                  name
                ),
                "utf-8"
              )
              if (short) {
                content = content.replace(
                  `${pattern}(${short})`,
                  program
                )
              } else {
                content = content.replace(
                  pattern,
                  program
                )
              }
              return true
            }
            return false
          }

          while(replaceShader('__VERTEX_SHADER__', 'vertex'));
          while(replaceShader('__FRAGMENT_SHADER__', 'frag'));
          res.send(content)
        })
      })
    },
    compress : true,
    port : 3000 
  }
}

