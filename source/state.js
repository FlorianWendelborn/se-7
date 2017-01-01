// region import

import {readFileSync as read, writeFileSync as write} from 'fs'

// endregion
// region state

let state = []

const save = () => write('./saved.data', JSON.stringify(state))
const load = () => {
	try {
		state = JSON.parse(read('./saved.data'))
	} catch (error) {
		state = []
	}
}

// endregion
// region export

export default {load, save}

// endregion
