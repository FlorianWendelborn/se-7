// region import

import inquirer from 'inquirer'

// internal

import library from './library'
import state from './state'
import person from './person'

// endregion

const father = person.create({
	name: 'father0',
	gender: 'm'
})

const child = person.create({
	name: 'child0',
	gender: 'm'
})

state.set(father)
state.set(child)

person.addChild



console.log(state.list())
