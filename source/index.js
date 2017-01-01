// region import

import inquirer from 'inquirer'

// internal

import library from './library'
import state from './state'

// endregion

library.addPerson({
	name: '1',
	gender: 'm'
})

console.log(state.list())
