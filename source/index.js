// region import

import inquirer from 'inquirer'

// internal

import state from './state'
import Person from './person'

// endregion

// region init

state.load()

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
						'Child',
						'Cancel'
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
								message: 'Second person?'
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
						case 'Cancel': {
							ask()
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
						'Aunt',
						'Cancel'
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
							break
						}
						case 'Cancel': {
							ask()
							break
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
