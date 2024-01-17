require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

// Parse the DATABASE_URL to extract connection details
const url = new URL(process.env.DATABASE_URL);
// const username = process.env.DATABASE_USERNAME;
// const password = process.env.DATABASE_PASSWORD;
// console.log(username, password)

const sequelize = new Sequelize(process.env.DATABASE_URL, {
// const sequelize = new Sequelize(url.pathname.slice(1), username, password, {
//   host: url.hostname,
//   port: url.port,
//   dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use this line if you encounter certificate verification issues (not recommended for production)
    }
  }
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(notes)
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
// psql "sslmode=require host=my-postgres-db.onrender.com dbname=mydatabase user=myusername password=mypassword port=5432"
// PGPASSWORD=2nlMtRkuFIh7Lw0fC6F2w02saolvxjuf psql -h dpg-cmii9u5a73kc739m03k0-a.oregon-postgres.render.com -U blog_pfl2_user blog_pfl2