// region import

import uuid from 'uuid/v4'
import Table from 'cli-table'

// internal

import state from './state'

// endregion

// region class

export default class Person {

	father = null
	mother = null
	partner = null
	gender = null
	name = ''
	children = []
	id = uuid()

	constructor (data) {
		if (!data.name || !data.gender) return false
		Object.assign(this, data)

		// new person?

		if (!data.id) state.set(this)
	}

	addChild = child => {
		if (this.gender === 'm') {
			if (child.father) return false
			child.father = this.id
		} else {
			if (child.mother) return false
			child.mother = this.id
		}

		this.children.push(child.id)

		// ensure uniqueness

		this.children = [...new Set(this.children)]

		// save

		state.set(this)
		state.set(child)
	}

	addPartner = person => {
		if (person.partner) return false
		if (this.partner) return false

		this.partner = person.id
		person.partner = this.id

		state.set(this)
		state.set(person)
	}

	stringify = () => ({
		father: this.father,
		mother: this.mother,
		partner: this.partner,
		gender: this.gender,
		name: this.name,
		children: this.children
	})

	print = () => {
		const table = new Table({
			head: ['key', 'value']
		})
		table.push(
			['Name', this.name],
			['Gender', ({
				m: 'male',
				f: 'female'
			})[this.gender]],
			['Father', this.father || 'none'],
			['Mother', this.mother || 'none']
		)
		console.log(table.toString())
	}

}

// endregion
