
interface Column {
    name: string
    headerText: string | null
    width?: number
    frozen?: boolean
    type?: string
    format?: string
}

interface Row {
    [key: string]: string | number;
}

const columns: Array<Column> = [
    {
        name: 'col1',
        headerText: 'col1',
        width: 150,
        frozen: true,
    },
    {
        name: 'col2',
        headerText: 'col2',
        width: 120,
        frozen: true,
    },
    {
        name: 'col3',
        headerText: 'col3',
        width: 120,
    },
    {
        name: 'col4',
        headerText: 'col4',
        width: 120,
    },
    {
        name: 'col5',
        headerText: 'col5',
        width: 120,
        type: 'numeric',
    },
    {
        name: 'col6',
        headerText: 'col6',
        width: 120,
        type: 'numeric',
        format: '0,0.00'
    },
]

// many columns
// for (let i = 0; i < 100; i++) {
//   columns.push({
//     name: `col${i}`,
//     headerText: `col${i}`,
//     width: 120,
//     frozen: i === 0,
//   })
// }

const rows: Array<Row> = [
    {
        col1: 'cell1-1',
        col2: 'cell1-2',
        col3: 'cell1-3',
        col4: 'cell1-4',
        col5: 101,
        col6: 1001,
    },
    {
        col1: 'cell2-1',
        col2: 'cell2-2',
        col3: 'cell2-3',
        col4: 'cell2-4',
        col5: 102,
        col6: 1002,
    },
    {
        col1: 'cell3-1',
        col2: 'cell3-2',
        col3: 'cell3-3',
        col4: 'cell3-4',
        col5: 103,
        col6: 1003,
    },
    {
        col1: 'cell4-1',
        col2: 'cell4-2',
        col3: 'cell4-3',
        col4: 'cell4-4',
        col5: 104,
        col6: 1004,
    },
    {
        col1: 'cell5-1',
        col2: 'cell5-2',
        col3: 'cell5-3',
        col4: 'cell5-4',
        col5: 105,
        col6: 1005,
    },
    {
        col1: 'cell6-1',
        col2: 'cell6-2',
        col3: 'cell6-3',
        col4: 'cell6-4',
        col5: 106,
        col6: 1006,
    },
]

// many rows
// for (let i = 0; i < 1000; i++) {
//   const row: Row = {}
//   for (const col of columns) {
//     row[col.name] = `cell ${i}`
//   }
//   rows.push(row)
// }

export { columns, rows, Column, Row }
