/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("medium", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
            table.string("medium_type").notNullable();
        })
        .then(() =>
            knex("medium").insert([
                { medium_type: "watercolor" },
                { medium_type: "acrylic" },
                { medium_type: "oil" },
                { medium_type: "gouache" },
                { medium_type: "digital" },
            ])
        );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("medium");
};
