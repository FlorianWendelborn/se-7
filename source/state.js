// region import

import clone from 'clone'
import {readFileSync as read, writeFileSync as write} from 'fs'

// internal

import Person from './person'

// endregion

// region state

const state = {
	_: {}
}

const save = () => write('./saved.json', `${JSON.stringify(state._, null, 2)}\n`)
const load = () => {
	try {
		state._ = JSON.parse(read('./saved.json'))
	} catch (error) {
		state._ = {}
	}
}

const get = id => new Person(Object.assign(state._[id], {id}))
const set = person => {
	const fakeState = clone(state._)
	fakeState[person.id] = person.stringify()

	detectCycles(fakeState)

	state._[person.id] = person.stringify()
	save()
}
const list = () => Object.keys(state._)

// endregion

// region cycle

let cancel = false

const detectCycles = state => {
	cancel = false
	Object.keys(state).forEach(person => detectCycle(state, person, state[person].children))
}

const detectCycle = (state, id, children) => {
	console.log(id, children)
	if (cancel) return
	if (children.includes(id)) {
		cancel = true
		throw new Error('cycle')
	}
	for (let i = 0; i < children.length; i++) {
		if (cancel) return
		const child = children[i]
		detectCycle(state, id, state[child].children)
	}
}

// endregion

// region export

export default {load, save, get, set, list}

// endregion
