const mongoose = require('mongoose');
const Team = require('../models/team');
const Stadium = require('../models/stadium');
const Match = require('../models/match');

// Connect to MongoDB
const mongoURI = 'mongodb+srv://karimelsayed401:FLoRvtqyZdEmuqf1@cluster0.lm3jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Change to your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to insert matches
const insertMatches = async () => {
    try {
        // Find all teams and stadiums from the database
        const teams = await Team.find(); // Assuming you have a Team model
        const stadiums = await Stadium.find(); // Assuming you have a Stadium model

        // Define your matches data with 5 matches using team and stadium names
        const matches = [
            {
                homeTeam: teams[0].name, // Al Masry
                awayTeam: teams[1].name, // Zamalek
                venue: stadiums[0].name, // Borg El Arab Stadium
                dateTime: new Date('2024-01-15T20:00:00Z'),
                mainReferee: 'John Doe',
                linesmen: ['Line Judge 1', 'Line Judge 2'],
            },
            {
                homeTeam: teams[2].name, // Al Ahly (EGY)
                awayTeam: teams[3].name, // Ceramica Cleopatra
                venue: stadiums[1].name, // Cairo International Stadium
                dateTime: new Date('2024-01-16T20:00:00Z'),
                mainReferee: 'Jane Smith',
                linesmen: ['Line Judge 3', 'Line Judge 4'],
            },
            {
                homeTeam: teams[4].name, // Pyramids
                awayTeam: teams[5].name, // Pharco
                venue: stadiums[2].name, // Suez Army Stadium
                dateTime: new Date('2024-01-17T20:00:00Z'),
                mainReferee: 'Mike Johnson',
                linesmen: ['Line Judge 5', 'Line Judge 6'],
            },
            {
                homeTeam: teams[6].name, // Al Ittihad
                awayTeam: teams[7].name, // El Gaish
                venue: stadiums[3].name, // Arab Contractors Stadium
                dateTime: new Date('2024-01-18T20:00:00Z'),
                mainReferee: 'Emily Davis',
                linesmen: ['Line Judge 7', 'Line Judge 8'],
            },
            {
                homeTeam: teams[8].name, // Zed FC
                awayTeam: teams[9].name, // Smouha
                venue: stadiums[4].name, // June 30 Stadium
                dateTime: new Date('2024-01-19T20:00:00Z'),
                mainReferee: 'Chris Brown',
                linesmen: ['Line Judge 9', 'Line Judge 10'],
            },
        ];

        // Loop through the matches array and create Match documents
        for (const matchData of matches) {
            const match = new Match(matchData);
            await match.save(); // Save each match to the database
            console.log(`Inserted match: Home Team: ${matchData.homeTeam}, Away Team: ${matchData.awayTeam}`);
        }
    } catch (error) {
        console.error('Error inserting matches:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
};

const deleteMatches = async () => {
    try {
        await Match.deleteMany(); // Delete all matches
        console.log('All matches deleted successfully.');
    } catch (error) {
        console.error('Error deleting matches:', error);
    }
}

// Call the insert function
deleteMatches();
insertMatches();
