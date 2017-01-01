// region import

import uuid from 'uuid/v4'

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

	stringify = () => ({
		father: this.father,
		mother: this.mother,
		partner: this.partner,
		gender: this.gender,
		name: this.name,
		children: this.children
	})

}

// endregion
