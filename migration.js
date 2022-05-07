const fs = require('fs')

const packages = require('./package.config')
const __mockResponse__ = require('./__mock-response__')

async function updateFile (package) {
  return new Promise((resolve, reject) => {
    fs.readFile('./package.config.js', 'utf-8', function(err, data) {
      if (err) reject(err)
    
      const re = new RegExp(`((.*\n){1,}const ${package} = )({(\n.*){1,})(\/\/ end ${package}(.*\n){1,}})`)
      const d = data.match(re)
      const badStringJSON = d[3]
      const headerBeforeFunction = d[1]
      const footerAfterFunction = d[5]
    
      // เพิ่ม double quote ให้ key
      let fixedJSON = badStringJSON.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?: /g, '"$2": ')
    
      // ปรับ Value ให้ single quote เป็น double quote
      fixedJSON = fixedJSON.replace(/'|`/g, '"')
    
      // เก็บค่า another function ไว้
      const backupAnotherFn = fixedJSON.match(/(\(.*{(\n.*){1,}\/\/ end anotherFn)/)
    
      // ปรับ another function ให้เป็นตัวแปรก่อน
      fixedJSON = fixedJSON.replace(/(\(.*{(\n.*){1,}\/\/ end anotherFn)/, '"ANOTHER_FN"')
    
      // ปรับ format ของ __mockResponse__
      const allPromotions = {}
      __mockResponse__.forEach(provider => {
        allPromotions[provider.serviceID] = {
          isEnabled: true
        }
      })
    
      // ปรับ isEnabled ใน packages เป็น false
      const packageData = JSON.parse(fixedJSON)
      packageData.promotions.map(promotion => {
        promotion.isEnabled = allPromotions[promotion.serviceID]?.isEnabled || false
      })
    
      // แปลง packageData ทำเป็น string
      let newString = JSON.stringify(packageData, null, 2)
    
      // Replace key to key ปกติ (เอา double quote ออก)
      newString = newString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?: /g, '$2: ')
    
      // เอาค่า another function fn กลับมา
      newString = newString.replace(/"ANOTHER_FN"/, backupAnotherFn[0])
    
      // เอา Replace double quote ของ BackendURL ให้เป็น backtick
      newString = newString.replace(/"(\${BACKEND_URL}.{1,})"/g, '`$1`')
    
      // แปลง double เป็น single quote
      newString = newString.replace(/"/g, "'")
    
      const newData = [headerBeforeFunction, newString, '\n', footerAfterFunction].join('')
    
      fs.writeFile('./package.config.js', newData, 'utf-8', function (err) {
        if (err) reject(err)
        console.log(`${package}: Completed`)
        resolve('completed')
      })
    })
  })
}

async function main() {
  for(const package of Object.keys(packages)) {
    await updateFile(package)
  }
}

main()