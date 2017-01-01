// region import

import assert from 'assert'

// internal

import Person from '../person'
import state from '../state'

// endregion

let father, mother, child

describe('Create Persons', () => {
	father = new Person({
		name: 'Test Father',
		gender: 'm'
	})
	it('should save the name', () => {
		assert.equal(father.name, 'Test Father')
	})
	mother = new Person({
		name: 'Test Mother',
		gender: 'f'
	})
	it('should save the gender', () => {
		assert.equal(mother.gender, 'f')
	})
})

describe('Add Children', () => {
	child = new Person({
		name: 'Test Child',
		gender: 'm'
	})
	father.addChild(child)
	mother.addChild(child)

	it('should update the child\'s father', () => {
		assert.equal(child.father, father.id)
	})

	it('should update the child\'s mother', () => {
		assert.equal(child.mother, mother.id)
	})

	it('should add the child to the mother\'s children array', () => {
		assert.deepEqual(mother.children, [child.id])
	})

	it('should add the child to the father\'s children array', () => {
		assert.deepEqual(father.children, [child.id])
	})
})

describe('Add Partner', () => {
	father.addPartner(mother)

	it('should update partner A', () => {
		assert.equal(mother.id, father.partner)
	})
	it('should update partner B', () => {
		assert.equal(father.id, mother.partner)
	})
})

describe('Find Siblings', () => {
	const child1 = new Person({
		name: 'Test Child 1',
		gender: 'm'
	})
	const child2 = new Person({
		name: 'Test Child 2',
		gender: 'f'
	})
	const mother2 = new Person({
		name: 'Test Mother 2',
		gender: 'm'
	})
	mother2.addChild(child1)
	mother2.addChild(child2)

	it('should find siblings', () => {
		assert.deepEqual(child1.getSiblings(), [child2.id])
	})
})
