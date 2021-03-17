const { options } = require('./DB/mysql.db');
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
    table.integer('id')
    table.string('nombre')
    table.string('descripcion')
    table.string('codigo')
    table.string('foto')
    table.integer('precio')
    table.integer('stock')
    table.string('timestamp')
})
    .then(() => console.log('table created!'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });