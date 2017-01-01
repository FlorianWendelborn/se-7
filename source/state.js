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

const detectCycles = state => {
	Object.keys(state).forEach(person => detectCycle(state, new Set(), state[person].children))
}

const detectCycle = (state, encountered, children) => {
	for (let i = 0; i < children.length; i++) {
		const child = children[i]
		if (encountered.has(child)) {
			console.error('Cycle Detected! Program terminates. Don\'t worry, your progress is saved and will automatically be loaded again')
			process.exit(1)
		}
		encountered.add(child)
		detectCycle(state, encountered, state[child].children)
	}
}

// endregion

// region export

export default {load, save, get, set, list}

// endregion
