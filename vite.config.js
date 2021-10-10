const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/table.ts'),
            name: 'SimpleTable',
            fileName: (format) => `simple-table.${format}.js`
        },
    }
})
