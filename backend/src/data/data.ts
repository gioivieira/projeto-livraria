import { IdGenerator } from "../services/idGenerator"

const idGenerator = new IdGenerator()

export const classicCoffees = [
    { id: idGenerator.generate(), name: 'Macchiato', ingredients: ['expresso', 'leite', 'espuma'], price: 11.00, created_at: new Date() },
    { id: idGenerator.generate(), name: 'Latte', ingredients: ['expresso', 'leite'], price: 9.00, created_at: new Date() },
    { id: idGenerator.generate(), name: 'Mocha', ingredients: ['expresso', 'leite', 'chocolate'], price: 15.00, created_at: new Date() },
    { id: idGenerator.generate(), name: 'Affogato', ingredients: ['sorvete de creme', 'expresso'], price: 12.00, created_at: new Date() },
]

export const ingredients = [
    { id: idGenerator.generate(), ingredient_name: 'expresso', ingredient_type: 'basic', price: 5.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'leite', ingredient_type: 'basic', price: 4.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'espuma', ingredient_type: 'basic', price: 2.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'chocolate', ingredient_type: 'basic', price: 6.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'sorvete de creme', ingredient_type: 'basic', price: 7.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'caramelo', ingredient_type: 'extra', price: 3.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'calda de chocolate', ingredient_type: 'extra', price: 4.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'canela', ingredient_type: 'extra', price: 1.00, created_at: new Date() },
    { id: idGenerator.generate(), ingredient_name: 'chantilly', ingredient_type: 'extra', price: 3.00, created_at: new Date() },
]