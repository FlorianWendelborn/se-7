// region import

import assert from 'assert'

// internal

import Person from '../person'
import state from '../state'

// endregion

// region test

describe('Find Siblings', () => {
	const child1 = new Person({
		name: 'Test Child 1',
		gender: 'm'
	})
	const child2 = new Person({
		name: 'Test Child 2',
		gender: 'f'
	})
	const mother = new Person({
		name: 'Test Mother 1',
		gender: 'f'
	})
	const mother2 = new Person({
		name: 'Mother 2',
		gender: 'f'
	})

	const child3 = new Person({
		name: '3',
		gender: 'm'
	})
	const child4 = new Person({
		name: '4',
		gender: 'f'
	})
	const child5 = new Person({
		name: '5',
		gender: 'm'
	})

	mother.addChild(child1)
	mother.addChild(child2)

	it('one sibling (1)', () => assert.deepEqual(child1.getSiblings(), [child2.id]))
	it('one sibling (2)', () => assert.deepEqual(child2.getSiblings(), [child1.id]))

	mother2.addChild(child3)
	mother2.addChild(child4)
	mother2.addChild(child5)

	it('multiple siblings (1)', () => assert.deepEqual(child3.getSiblings().sort(), [child4.id, child5.id].sort()))
	it('multiple siblings (2)', () => assert.deepEqual(child4.getSiblings().sort(), [child3.id, child5.id].sort()))
	it('multiple siblings (3)', () => assert.deepEqual(child5.getSiblings().sort(), [child3.id, child4.id].sort()))
})

describe('Find Uncles', () => {
	const child = new Person({
		name: '1',
		gender: 'm'
	})
	const father = new Person({
		name: '2',
		gender: 'm'
	})
	const uncle = new Person({
		name: '3',
		gender: 'm'
	})
	const uncle2 = new Person({
		name: '4',
		gender: 'm'
	})
	const grandpa = new Person({
		name: '5',
		gender: 'm'
	})

	father.addChild(child)
	grandpa.addChild(father)
	grandpa.addChild(uncle)
	grandpa.addChild(uncle2)

	const mother = new Person({
		name: '6',
		gender: 'f'
	})
	const grandpa2 = new Person({
		name: '7',
		gender: 'm'
	})
	const uncle3 = new Person({
		name: '8',
		gender: 'm'
	})

	mother.addChild(child)
	grandpa2.addChild(mother)
	grandpa2.addChild(uncle3)

	it('father-side uncles', () => assert.deepEqual(child.getUncles('m').sort(), [uncle.id, uncle2.id].sort()))
	it('mother-side uncles', () => assert.deepEqual(child.getUncles('f'), [uncle3.id]))
})

describe('Find Aunts', () => {
	const child = new Person({
		name: '1',
		gender: 'm'
	})
	const father = new Person({
		name: '2',
		gender: 'm'
	})
	const aunt = new Person({
		name: '3',
		gender: 'f'
	})
	const aunt2 = new Person({
		name: '4',
		gender: 'f'
	})
	const grandpa = new Person({
		name: '5',
		gender: 'm'
	})

	father.addChild(child)
	grandpa.addChild(father)
	grandpa.addChild(aunt)
	grandpa.addChild(aunt2)

	const mother = new Person({
		name: '6',
		gender: 'f'
	})
	const grandpa2 = new Person({
		name: '7',
		gender: 'm'
	})
	const aunt3 = new Person({
		name: '8',
		gender: 'f'
	})

	mother.addChild(child)
	grandpa2.addChild(mother)
	grandpa2.addChild(aunt3)

	it('father-side aunts', () => assert.deepEqual(child.getAunts('m').sort(), [aunt.id, aunt2.id].sort()))
	it('mother-side aunts', () => assert.deepEqual(child.getAunts('f'), [aunt3.id]))
})

describe('Find Children', () => {
	const child1 = new Person({
		name: 'c1',
		gender: 'm'
	})
	const child2 = new Person({
		name: 'c2',
		gender: 'm'
	})
	const child3 = new Person({
		name: 'c3',
		gender: 'm'
	})
	const father1 = new Person({
		name: 'f1',
		gender: 'm'
	})
	const father2 = new Person({
		name: 'f2',
		gender: 'm'
	})
	father1.addChild(child1)
	father2.addChild(child2)
	father2.addChild(child3)

	it('one child', () => assert.deepEqual(father1.getChildren(), [child1.id]))
	it('multiple children', () => assert.deepEqual(father2.getChildren().sort(), [child2.id, child3.id].sort()))
})

describe('Find Cousins', () => {
	const child1 = new Person({
		name: 'c1',
		gender: 'm'
	})
	const child2 = new Person({
		name: 'c2',
		gender: 'f'
	})
	const mother1 = new Person({
		name: 'm1',
		gender: 'f'
	})
	const mother2 = new Person({
		name: 'm2',
		gender: 'f'
	})
	const grandpa1 = new Person({
		name: 'g1',
		gender: 'm'
	})
	const grandpa2 = new Person({
		name: 'g2',
		gender: 'm'
	})
	const uncle = new Person({
		name: 'u',
		gender: 'm'
	})
	const aunt = new Person({
		name: 'a',
		gender: 'f'
	})
	const cousin1 = new Person({
		name: 'cousin1',
		gender: 'm'
	})
	const cousin2 = new Person({
		name: 'cousin2',
		gender: 'm'
	})
	const cousin3 = new Person({
		name: 'cousin3',
		gender: 'f'
	})

	mother1.addChild(child1)
	grandpa1.addChild(mother1)
	grandpa1.addChild(uncle)
	uncle.addChild(cousin1)

	mother2.addChild(child2)
	grandpa2.addChild(mother2)
	grandpa2.addChild(aunt)
	aunt.addChild(cousin2)
	aunt.addChild(cousin3)

	it('one cousin', () => assert.deepEqual(child1.getCousins(), [cousin1.id]))
	it('multiple cousins', () => assert.deepEqual(child2.getCousins().sort(), [cousin2.id, cousin3.id].sort()))
})

describe('Find Grandparents', () => {
	const grandma = new Person({
		name: 'smith',
		gender: 'f'
	})
	const mother1 = new Person({
		name: 'm1',
		gender: 'f'
	})
	const child1 = new Person({
		name: 'c1',
		gender: 'f'
	})

	grandma.addChild(mother1)
	mother1.addChild(child1)

	it('grandma', () => assert.deepEqual(child1.getGrandparents(), [grandma.id]))

	const grandpa = new Person({
		name: 'smith',
		gender: 'm'
	})
	const mother2 = new Person({
		name: 'm2',
		gender: 'f'
	})
	const child2 = new Person({
		name: 'c2',
		gender: 'f'
	})

	grandpa.addChild(mother2)
	mother2.addChild(child2)

	it('grandpa', () => assert.deepEqual(child2.getGrandparents(), [grandpa.id]))

	const g1 = new Person({
		name: 'g1',
		gender: 'f'
	})
	const g2 = new Person({
		name: 'g2',
		gender: 'm'
	})
	const g3 = new Person({
		name: 'g3',
		gender: 'f'
	})
	const g4 = new Person({
		name: 'g4',
		gender: 'm'
	})

	const m = new Person({
		name: 'm',
		gender: 'f'
	})
	const f = new Person({
		name: 'f',
		gender: 'm'
	})
	const c = new Person({
		name: 'c',
		gender: 'm'
	})
	g1.addChild(m)
	g2.addChild(m)
	g1.addPartner(g2)
	g3.addChild(f)
	g4.addChild(f)
	g3.addPartner(g4)
	f.addChild(c)
	m.addChild(c)

	it('all of them', () => assert.deepEqual(c.getGrandparents().sort(), [g1.id, g2.id, g3.id, g4.id].sort()))
})

describe('Find Grandchildren', () => {
	const grandma = new Person({
		name: 'og',
		gender: 'f'
	})
	const mother = new Person({
		name: 'm',
		gender: 'f'
	})
	const father = new Person({
		name: 'f',
		gender: 'm'
	})
	const c1 = new Person({
		name: 'c1',
		gender: 'f'
	})
	const c2 = new Person({
		name: 'c2',
		gender: 'm'
	})
	const c3 = new Person({
		name: 'c3',
		gender: 'f'
	})
	const c4 = new Person({
		name: 'c4',
		gender: 'f'
	})
	grandma.addChild(father)
	grandma.addChild(mother)
	father.addChild(c1)
	father.addChild(c2)
	mother.addChild(c3)
	mother.addChild(c4)
	it('all of them', () => assert.deepEqual(grandma.getGrandchildren().sort(), [c1.id, c2.id, c3.id, c4.id].sort()))
})

// endregion
