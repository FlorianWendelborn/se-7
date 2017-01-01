// region import

import uuid from 'uuid/v4'

// internal

import state from './state'

// endregion

export default class Person {

	constructor ({name, gender}) {
		if (!name || !gender) throw new Error('Invalid Person')
		this.name = name
		this.gender = gender
	}

	addChild = child => {
		
	}

}

// region create

export const createPerson = ({name, gender}) => ({
	name,
	gender,
	children: [],
	father: null,
	mother: null,
	partner: null,
	id: uuid()
})

// endregion

// region add

export const addChild = (_parent, _child) => {
	const parent = state.get(_parent)
	const child = state.get(_child)
	if (parent.gender === 'm') {
		if (child.father) return false
		child.father = _parent
		parent.children.push(_child)
		parent.children = [...new Set(parent.children)]
		state.save(father)
		state.save(child)
	} else {
		if (child.mother) return false
		child.mother = _parent
		parent.children.push(_child)
		parent.children = [...new Set(parent.children)]
		state.save(parent)
		state.save(child)
	}
	return true
}

// endregion
