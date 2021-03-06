
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(512), // eslint-disable-line new-cap
        },
        salt: {
            type: Sequelize.STRING,
        },
        scopes: {
            type: Sequelize.ARRAY(Sequelize.STRING), // eslint-disable-line new-cap
            defaultValue: [''],
        },
        refreshToken: {
            type: Sequelize.STRING,
        },
        resetToken: {
            type: Sequelize.STRING,
        },
        resetExpires: {
            type: Sequelize.DATE,
        },
        provider: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()'),
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()'),
        },
    }),
    down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
        return true;
    },
    // down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
