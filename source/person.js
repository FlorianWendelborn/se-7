// region import

import uuid from 'uuid/v4'

// internal

import state from './state'

// endregion

// region create

export const createPerson = ({name, gender}) => ({
	name,
	gender,
	id: uuid()
})

// endregion

// region add

export const addChild = (_parent, _child) => {
	state.get()
}

// endregion
