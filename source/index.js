// region import

import inquirer from 'inquirer'

// internal

import library from './library'
import state from './state'
import Person from './person'

// endregion

// region cli

const ask = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'action',
		message: 'What do you want to do?',
		choices: [
			'Add',
			'Print',
			'Exit'
		]
	}]).then(({action}) => {
		const choices = state.list().map(id => ({
			value: id,
			name: `${state.get(id).name} (${id})`
		}))

		switch (action) {
			case 'Add':
				inquirer.prompt({
					type: 'list',
					name: 'action',
					message: 'Add...',
					choices: [
						'Person',
						'Partner',
						'Child'
					]
				}).then(({action}) => {
					switch (action) {
						case 'Person': {
							inquirer.prompt([{
								type: 'input',
								name: 'name',
								message: 'Name?'
							}, {
								type: 'list',
								name: 'gender',
								message: 'Gender?',
								choices: [{
									name: 'Male',
									value: 'm'
								}, {
									name: 'Female',
									value: 'f'
								}]
							}]).then(({gender, name}) => {
								new Person({gender, name})
								ask()
							})
							break
						}
						case 'Partner': {
							inquirer.prompt([{
								type: 'list',
								name: 'from',
								choices,
								message: 'First person?'
							}, {
								type: 'list',
								name: 'to',
								choices,
								message: 'Secon person?'
							}]).then(({from, to}) => {
								state.get(from).addPartner(state.get(to))
								ask()
							})
							break
						}
						case 'Child': {
							inquirer.prompt([{
								type: 'list',
								name: 'from',
								choices,
								message: 'Parent'
							}, {
								type: 'list',
								name: 'to',
								choices,
								message: 'Child'
							}]).then(({from, to}) => {
								state.get(from).addChild(state.get(to))
								ask()
							})
							break
						}
					}
				})
			break
			case 'Print':
				inquirer.prompt({
					type: 'list',
					name: 'action',
					message: 'Print...',
					choices: [
						'Person',
						'Grandparents',
						'Siblings',
						'Cousins',
						'Uncle',
						'Aunt'
					]
				}).then(({action}) => {
					switch (action) {
						case 'Person': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}]).then(({id}) => {
								state.get(id).print()
								ask()
							})
							break
						}
						case 'Grandparents': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}]).then(({id}) => {
								state.get(id).printGrandparents()
								ask()
							})
							break
						}
						case 'Siblings': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}]).then(({id}) => {
								state.get(id).printSiblings()
								ask()
							})
							break
						}
						case 'Cousins': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}]).then(({id}) => {
								state.get(id).printCousins()
								ask()
							})
							break
						}
						case 'Uncle': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}, {
								type: 'list',
								name: 'gender',
								message: 'From?',
								choices: [{
									name: 'Father',
									value: 'm'
								}, {
									name: 'Mother',
									value: 'f'
								}]
							}]).then(({id, gender}) => {
								state.get(id).printUncle(gender)
								ask()
							})
							break
						}
						case 'Aunt': {
							inquirer.prompt([{
								type: 'list',
								name: 'id',
								message: 'Who?',
								choices
							}, {
								type: 'list',
								name: 'gender',
								message: 'From?',
								choices: [{
									name: 'Father',
									value: 'm'
								}, {
									name: 'Mother',
									value: 'f'
								}]
							}]).then(({id, gender}) => {
								state.get(id).printAunt(gender)
								ask()
							})
						}
					}
				})
			break
			case 'Exit': {
				process.exit(0)
			}
		}
	})
}

ask()

// endregion

// const father0 = new Person({
// 	name: 'father0',
// 	gender: 'm'
// })
//
// const mother0 = new Person({
// 	name: 'mother0',
// 	gender: 'f'
// })
//
// const child0 = new Person({
// 	name: 'child0',
// 	gender: 'm'
// })
//
// const child1 = new Person({
// 	name: 'child1',
// 	gender: 'f'
// })
//
// const grandpa0 = new Person({
// 	name: 'grandpa0',
// 	gender: 'm'
// })
//
// const grandma0 = new Person({
// 	name: 'grandma0',
// 	gender: 'f'
// })
//
// const grandma1 = new Person({
// 	name: 'grandma1',
// 	gender: 'f'
// })
//
// const grandpa1 = new Person({
// 	name: 'grandpa1',
// 	gender: 'm'
// })
//
// const uncle0 = new Person({
// 	name: 'uncle0',
// 	gender: 'm'
// })
//
// const aunt0 = new Person({
// 	name: 'aunt0',
// 	gender: 'f'
// })
//
// const cousin0 = new Person({
// 	name: 'cousin0',
// 	gender: 'm'
// })
//
// const cousin1 = new Person({
// 	name: 'cousin1',
// 	gender: 'f'
// })
//
// // gp0
//
// grandpa0.addPartner(grandma0)
//
// grandma0.addChild(mother0)
// grandpa0.addChild(mother0)
//
// grandpa0.addChild(uncle0)
// grandma0.addChild(uncle0)
//
// // gp1
//
// grandpa1.addPartner(grandma1)
// grandpa1.addChild(aunt0)
// grandma1.addChild(aunt0)
// grandpa1.addChild(father0)
// grandma1.addChild(father0)
//
// // p0
//
// father0.addChild(child0)
// father0.addChild(child1)
//
// mother0.addChild(child0)
// mother0.addChild(child1)
//
// mother0.addPartner(father0)
//
// // u&a
//
// uncle0.addChild(cousin0)
// aunt0.addChild(cousin1)
//
// // c0
//
// // child0.printUncle('f')
// // child0.printAunt('m')
// // child0.printCousins()
// // child0.printGrandparents()
// grandma0.printGrandchildren()
//
// // child0.addChild(grandma0)
