export const rolePermissionSchema = (knex) => {
  return knex.schema
    .createTable('role_permission', function (table) {
      table.integer('role_id').references('role.id');
      table.integer('permission_id').references('permission.id');
    })
};