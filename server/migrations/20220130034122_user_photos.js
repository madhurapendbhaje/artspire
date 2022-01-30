/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_photo", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
        table.uuid("user_id").notNullable();
        table.uuid("photo_id").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("user_photo");
};
