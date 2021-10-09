const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'MyLib',
            fileName: (format) => `my-lib.${format}.js`
        },
        rollupOptions: {
            // // make sure to externalize deps that shouldn't be bundled
            // // into your library
            // external: ['vue'],
            // output: {
            //     // Provide global variables to use in the UMD build
            //     // for externalized deps
            //     globals: {
            //         vue: 'Vue'
            //     }
            // }
        }
    }
})
