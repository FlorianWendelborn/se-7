// region import

import inquirer from 'inquirer'

// internal

import library from './library'
import state from './state'
import Person from './person'

// endregion

const father = new Person({
	name: 'father0',
	gender: 'm'
})

const mother = new Person({
	name: 'mother0',
	gender: 'f'
})

const child = new Person({
	name: 'child0',
	gender: 'm'
})

state.set(father)
state.set(child)

mother.addChild(child)
father.addChild(child)

mother.addPartner(father)

mother.print()
