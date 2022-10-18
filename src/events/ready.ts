import {clear, clog, error, evnt} from "../util/helper/consoleHelper";
import {token, clientId, guildId} from "../util/config/config";
import {Client, REST, Routes} from 'discord.js';
import fs = require('node:fs');

module.exports = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        try {
            clear();
            clog(`Ready! Logged in as ${client.user?.tag}`);
            registerSlashCommands()
        } catch (e) {
            error("Ready Event: " + e);
        }
    },
};

async function registerSlashCommands() {
    try {
        const commands = [];
        const commandFiles = fs.readdirSync(process.cwd() + '\\out\\commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(process.cwd() + `\\out\\commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({version: '10'}).setToken(token);

        console.log(`Started refreshing ${commands.length} application [/] commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );

        console.log(`Successfully reloaded  application [/] commands.`);
    } catch (error) {
        console.error(error);
    }
}
