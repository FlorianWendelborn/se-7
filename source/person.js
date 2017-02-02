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

	// #region add

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
		if (person.id === this.id) return false

		this.partner = person.id
		person.partner = this.id

		state.set(this)
		state.set(person)
	}

	// #endregion

	// #region get

	getSiblings = () => {
		let siblings = []
		if (this.father) siblings.push(...state.get(this.father).children)
		if (this.mother) siblings.push(...state.get(this.mother).children)

		// remove self
		siblings = siblings.filter(id => id !== this.id)

		// ensure uniqueness
		return [...new Set(siblings)]
	}

	getUncles = gender => {
		const parent = ({
			m: 'father',
			f: 'mother'
		})[gender]

		if (!this[parent]) return []

		return state
			.get(this[parent])
			.getSiblings()
			.filter(item => state.get(item).gender === 'm')
	}

	getAunts = gender => {
		const parent = ({
			m: 'father',
			f: 'mother'
		})[gender]

		if (!this[parent]) return []

		return state
			.get(this[parent])
			.getSiblings()
			.filter(item => state.get(item).gender === 'f')
	}

	getCousins = () => {
		let people = []
		if (this.father) people.push(
			...state.get(this.father).getSiblings()
		)
		if (this.mother) people.push(
			...state.get(this.mother).getSiblings()
		)

		let cousins = []

		people.forEach(item => cousins.push(...state.get(item).children))

		// ensure uniqueness
		return [...new Set(cousins)]
	}

	getChildren = () => this.children

	getParents = () => [this.father, this.mother].filter(exists => exists)

	getGrandparents = () => {
		const grandparents = []
		if (this.father) grandparents.push(...state.get(this.father).getParents())
		if (this.mother) grandparents.push(...state.get(this.mother).getParents())

		// ensure uniqueness
		return [...new Set(grandparents)]
	}

	getGrandchildren = () => {
		const grandchildren = this
			.getChildren()
			.map(child => state.get(child).getChildren())
			.reduce((a, b) => [...a, ...b], [])

		// ensure uniqueness
		return [...new Set(grandchildren)]
	}

	// #endregion

	// #region helper

	stringify = () => ({
		father: this.father,
		mother: this.mother,
		partner: this.partner,
		gender: this.gender,
		name: this.name,
		children: this.children
	})

	// #endregion

	// #region print self

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

	// #endregion

	// #region print others

	printChildren = () => this.getChildren.forEach(child => state.get(child).print())

	printSiblings = () => this.getSiblings().forEach(sibling => state.get(sibling).print())

	printUncles = gender => this.getUncles(gender).forEach(item => state.get(item).print())

	printAunts = gender => this.getAunts(gender).forEach(item => state.get(item).print())

	printParents = () => this.getParents().forEach(item => state.get(item).print())

	printGrandparents = () => this.getGrandparents().forEach(item => state.get(item).print())

	printCousins = () => this.getCousins().forEach(cousin => state.get(cousin).print())

	printGrandchildren = () => this.getGrandchildren().forEach(child => state.get(child).print())

	// #endregion

}

// endregion
