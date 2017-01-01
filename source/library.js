// region import

import state from './state'
import {createPerson} from './person'

// endregion
// region init

state.load()

// endregion

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

const addPerson = data => state.set(createPerson(data))

// endregion

// region cycle



// endregion

// region parents



// endregion

// region get

const getChildren = _person => {
	// TODO
}

const getSiblings = _person => {
	// TODO
}

const getParents = _person => {
	// TODO
}

const getUncles = _person => {
	// TODO
}

const getAunts = _person => {
	// TODO
}

const getGrandparents = _person => {
	// TODO
}

const getGrandchildren = _person => {
	// TODO
}

// endregion

// region export

export default {
	addPerson
}

// endregion
