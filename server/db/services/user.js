const User = require('../models/Users');

module.exports = {
    findOrCreate: async (redditName, accessToken) => {
        try {
            const user = await User.findOne({ where: { username: redditName }})

            if (!user) {
                const newUser = await User.create({ username: redditName, access_token: accessToken });

                console.log('New user created!')
                return newUser;
            }

            return user;
        } catch (err) {
            return console.error(`Sorry, there was an error: ${err}`)
        }
    },

    findAccessToken: async(redditName) => {
        try {
            const user = await User.findOne({ where: { username: redditName }});

            if (user) {
                const accessToken = user.dataValues.access_token;
                return accessToken;
            }
        } catch (err) {
            return console.error(err);
        }
    }
}