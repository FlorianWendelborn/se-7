// region import

import state from './state'

// endregion

state.load()

/*
TODO
- add first person
- add non-connected person
- check cycles
- add parents
- add partners

GET

- person
	- sister, cousin, uncle, grandparents, etc.
*/

// region add

const addPerson = person => {
	state.push(person)
}

// endregion

// region cycle



// endregion

// region parents



// endregion

// region partners

const marry

// endregion

// region get

const getChildren = person => {
	// TODO
}

const getSiblings = person => {
	// TODO
}

const getParents = person => {
	// TODO
}

const getUncles = person => {
	// TODO
}

const getAunts = person => {
	// TODO
}

const getGrandparents = person => {
	// TODO
}

const getGrandchildren = person => {
	// TODO
}

// endregion

// region export

export default {
	addPerson
}

// endregion
