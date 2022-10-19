import {error} from "../util/helper/consoleHelper";
import {ButtonInteraction, Embed, EmbedBuilder} from "discord.js";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: ButtonInteraction) {
        try {
            if (interaction.customId === "ticketclose") {
                const ticketCloseEmbed = new EmbedBuilder()
                    .setColor(ticketEmbedColor)
                    .setTitle("Ticket Closed")
                    .setDescription("The ticket will be closed in 30 sec.")
                    .setFooter({
                        text: "Ticket-Bot by .jannik#6908",
                        iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
                    })

                interaction.reply({embeds: [ticketCloseEmbed]})
                setTimeout(() => {
                    interaction.channel.delete();
                }, 30000)
            }
        } catch (e) {
            error("Ticket Close Button Event: " + e);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};
