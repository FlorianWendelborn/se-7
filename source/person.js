// region import

import uuid from 'uuid/v4'
import state from './state'

// endregion

// region create

const create = ({name, gender}) => ({
	name,
	gender,
	id: uuid()
})

// endregion

// region add

const addChild = (_parent, _child) => ({

})

// endregion

// region export

export default {create}

// endregion
