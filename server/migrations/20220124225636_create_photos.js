/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("photos", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
        table.string("url").notNullable().unique();
        table.string("category").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("photos");
};
