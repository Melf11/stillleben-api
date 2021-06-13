module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8055),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '3d20c047749dbc1071bd12b7d1c2f4bc'),
    },
  },
});
