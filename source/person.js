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

	addPartner = person => { // TODO self
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
			head: ['key', 'value', 'uuid']
		})
		table.push(
			['name', this.name, this.id],
			['gender', ({
				m: 'male',
				f: 'female'
			})[this.gender]],
		)
		if (this.father) table.push(['father', state.get(this.father).name, this.father])
		if (this.mother) table.push(['mother', state.get(this.mother).name, this.mother])
		if (this.partner) table.push(['partner', state.get(this.partner).name, this.partner])
		console.log(table.toString())
	}

	printChildren = () => {
		this.children.forEach(child => state.get(child).print())
	}

	getSiblings = () => {
		let siblings = []
		if (this.father) siblings.push(...state.get(this.father).children)
		if (this.mother) siblings.push(...state.get(this.mother).children)

		// ensure uniqueness

		siblings = [...new Set(siblings)]

		// remove self

		siblings = siblings.filter(id => id !== this.id)

		return siblings
	}

	printSiblings = () => {
		this.getSiblings().forEach(sibling => state.get(sibling).print())
	}

	printUncle = gender => {
		if (gender === 'm' && !this.father) return false
		if (gender === 'f' && !this.mother) return false

		state
			.get(gender === 'm' ? this.father : this.mother)
			.getSiblings()
			.filter(item => state.get(item).gender === 'm')
			.forEach(item => state.get(item).print())
	}

	printAunt = gender => {
		if (gender === 'm' && !this.father) return false
		if (gender === 'f' && !this.mother) return false

		state
			.get(gender === 'm' ? this.father : this.mother)
			.getSiblings()
			.filter(item => state.get(item).gender === 'f')
			.forEach(item => state.get(item).print())
	}

}

// endregion
