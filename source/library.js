// region import

import state from './state'
import Person from './person'

// endregion
// region init

state.load()

// endregion

/*
TODO
- check cycles

GET

- person
	- sister, cousin, uncle, grandparents, etc.
*/

// region get

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
