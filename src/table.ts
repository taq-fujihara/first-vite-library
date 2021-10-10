import { Body, ColGroup, Component, Container, Header, Table, TableBodyRow } from './dom'
import { Column, Row } from './sample_data'

import './style.scss'

type SimpleTableOptions = {
    columns: Array<Column>
    onFetch?: (currentPage: number) => Promise<{ rows: Array<Row> }>
}

class SimpleTable {
    private _options: SimpleTableOptions

    private container: Component | undefined
    private table: Component | undefined
    private body: Component | undefined

    private constructor(options: SimpleTableOptions) {
        this._options = options
    }

    static getInstance(options: SimpleTableOptions) {
        return new SimpleTable(options)
    }

    get columns(): Array<Column> {
        return this._options.columns
    }

    async mount(element: HTMLDivElement): Promise<void> {
        this.table = new Table()
        this.table.append(new ColGroup(this.columns))
        this.table.append(new Header(this.columns))
        this.body = new Body()
        this.table.append(this.body)

        this.container = new Container()
        this.container.append(this.table)

        element.appendChild(this.container.elem)

        if (this._options.onFetch) {
            const result = await this._options.onFetch(1)
            this.renderRows(result.rows)
        }
    }

    renderRows(rows: Array<Row>): void {
        const fragment = document.createDocumentFragment()
        rows
            .map(r => new TableBodyRow(this.columns, r))
            .forEach(row => {
                fragment.appendChild(row.elem)
            })
        this.body?.elem.append(fragment)
    }
}

export const getInstance = SimpleTable.getInstance
