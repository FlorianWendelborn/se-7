// region import

import {readFileSync as read, writeFileSync as write} from 'fs'

// internal

import Person from './person'

// endregion
// region state

const state = {
	_: {}
}

const save = () => write('./saved.data', JSON.stringify(state._))
const load = () => {
	try {
		state._ = JSON.parse(read('./saved.data'))
	} catch (error) {
		state._ = {}
	}
}

const get = id => new Person(Object.assign(state._[id], {id}))
const set = person => {
	state._[person.id] = person.stringify()
	save()
}
const list = () => Object.keys(state._)

// endregion
// region export

export default {load, save, get, set, list}

// endregion
