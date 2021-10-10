import { getInstance } from './table'
import { columns, rows } from './sample_data'

const table = getInstance({
    columns,
    async onFetch(currentPage) {
        return { rows }
    },
})
table.mount(
    document.getElementById('app') as HTMLDivElement
)
