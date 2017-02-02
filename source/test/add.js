// region import

import assert from 'assert'

// internal

import Person from '../person'
import state from '../state'

// endregion

// region test

let father, mother

describe('Create Persons', () => {
	father = new Person({
		name: 'Test Father',
		gender: 'm'
	})
	it('save the name', () => assert.equal(father.name, 'Test Father'))
	mother = new Person({
		name: 'Test Mother',
		gender: 'f'
	})
	it('save the gender', () => assert.equal(mother.gender, 'f'))
})

describe('Add Children', () => {
	const child = new Person({
		name: 'Test Child',
		gender: 'm'
	})
	father.addChild(child)
	mother.addChild(child)

	it('update the child\'s father', () => assert.equal(child.father, father.id))

	it('update the child\'s mother', () => assert.equal(child.mother, mother.id))

	it('add the child to the mother\'s children array', () => assert.deepEqual(mother.children, [child.id]))

	it('add the child to the father\'s children array', () => assert.deepEqual(father.children, [child.id]))
})

describe('Add Partner', () => {
	father.addPartner(mother)

	it('update partner A', () => assert.equal(mother.id, father.partner))
	it('update partner B', () => assert.equal(father.id, mother.partner))
})

// endregion
