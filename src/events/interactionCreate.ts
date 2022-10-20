import {Collection} from "discord.js"
import path from "node:path"
import fs from "node:fs"
import {err} from "../util/helper/consoleHelper";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: any) {
        //#region SlashCommandHandler
        interaction.commands = new Collection();
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            interaction.commands.set(command.data.name, command);
        }
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.commands.get(interaction.commandName);

        if (!command) return;
        //#endregion SlashCommandHandle

        try {
            await command.execute(interaction);
        } catch (e) {
            err("InteractionCreate Event: " + e);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};
