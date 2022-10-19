import {clear, clog, error} from "../util/helper/consoleHelper";
import {token, clientId, guildId} from "../util/config/config";
import {Client, REST, Routes} from 'discord.js';
import fs = require('node:fs');
import {registerSlashCommands} from "../util/functions/registerSlashCommands";
import {startLogo} from "../util/functions/botStartAscii";

module.exports = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        try {
            clear();
            startLogo()
            clog(`Ready! Logged in as ${client.user?.tag}`);
            registerSlashCommands()
        } catch (e) {
            error("Ready Event: " + e);
        }
    },
};
