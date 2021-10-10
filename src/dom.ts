import numeral from 'numeral'
import { Column, Row } from "./sample_data"

class CssClassName {
    private static prefix = 'c3t'

    private _name: string | null
    private _attribute: string | null

    private constructor() {
        this._name = null
        this._attribute = null
    }

    static of(name: string | null = null) {
        const instance = new CssClassName()
        instance._name = name
        return instance
    }

    attr(attribute: string) {
        this._attribute = attribute
        return this
    }

    get value(): string {
        const name = this._name ?
            `${CssClassName.prefix}__${this._name}` :
            CssClassName.prefix

        return this._attribute ?
            `${name}--${this._attribute}` :
            name
    }
}

interface Component {
    readonly elem: HTMLElement
    append(component: Component): void
}

class Container implements Component {
    private element: HTMLElement

    constructor() {
        const element = document.createElement('div')
        element.classList.add(CssClassName.of().value)
        this.element = element
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(component: Component) {
        this.element.appendChild(component.elem)
    }
}

class Table implements Component {
    private element: HTMLElement

    constructor() {
        const element = document.createElement('table')
        element.classList.add(CssClassName.of('table').value)
        this.element = element
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(component: Component) {
        this.element.appendChild(component.elem)
    }
}

class ColGroup implements Component {
    private element: HTMLElement

    constructor(columns: Array<Column>) {
        const colgroup = document.createElement('colgroup')

        for (const c of columns) {
            const column = document.createElement('col')
            if (c.width !== undefined) {
                column.style.width = `${c.width}px`
            }
            colgroup.appendChild(column)
        }
        this.element = colgroup
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(component: Component) {
        this.element.appendChild(component.elem)
    }
}

class Header implements Component {
    private element: HTMLElement

    constructor(columns: Array<Column>) {
        const thead = document.createElement('thead')
        thead.classList.add(CssClassName.of('header').value)

        const tr = document.createElement('tr')
        let widthSum = 0
        for (const column of columns) {
            const th = document.createElement('th')
            th.textContent = column.headerText
            th.classList.add(CssClassName.of('header-cell').value)
            if (column.frozen) {
                th.classList.add(
                    CssClassName.of('cell').attr('frozen').value
                )
                th.style.left = `${widthSum}px`
            }
            switch (column.type) {
                case 'numeric':
                    th.classList.add(
                        CssClassName.of('cell').attr('numeric').value
                    )
                    break;
            }
            tr.appendChild(th)

            widthSum += column.width ? column.width : 0
        }
        thead.appendChild(tr)

        this.element = thead
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(component: Component) {
        this.element.appendChild(component.elem)
    }
}

class Body implements Component {
    private element: HTMLElement

    constructor() {
        this.element = document.createElement('tbody')
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(component: Component) {
        this.element.appendChild(component.elem)
    }
}

class TableBodyRow implements Component {
    private element: HTMLElement

    constructor(columns: Array<Column>, row: Row) {
        let widthSum = 0

        const tr = document.createElement('tr')
        tr.classList.add(CssClassName.of('row').value)

        widthSum = 0

        for (const column of columns) {
            const td = document.createElement('td')
            td.classList.add(CssClassName.of('cell').value)
            if (column.frozen) {
                td.classList.add(
                    CssClassName.of('cell').attr('frozen').value
                )
                td.style.left = `${widthSum}px`
            }

            let textContent = ''

            switch (column.type) {
                case 'numeric':
                    td.classList.add(
                        CssClassName.of('cell').attr('numeric').value
                    )
                    textContent = column.format ?
                        numeral(row[column.name]).format(column.format) :
                        row[column.name]
                    break;
                default:
                    textContent = row[column.name] as string
                    break
            }

            td.textContent = textContent

            tr.appendChild(td)

            widthSum += column.width ? column.width : 0
        }

        this.element = tr
    }

    get elem(): HTMLElement {
        return this.element
    }

    append(_: Component) {
        throw new Error('No Implementation')
    }
}



export { Component, Container, Table, ColGroup, Header, Body, TableBodyRow }
