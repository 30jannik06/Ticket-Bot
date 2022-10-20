import {err} from "../util/helper/consoleHelper";
import {ButtonInteraction, Embed, EmbedBuilder, PermissionsBitField} from "discord.js";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: ButtonInteraction) {
        try {
            if (interaction.customId === "ticketclose") {
                if (interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
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

                } else {
                    const noRightsEmbed = new EmbedBuilder()
                        .setColor(ticketEmbedColor)
                        .setTitle("Not Enoght Rights")
                        .setDescription("You don't have enough rights to close a ticket.")
                        .setFooter({
                            text: "Ticket-Bot by .jannik#6908",
                            iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
                        })
                    interaction.reply({embeds: [noRightsEmbed], ephemeral: true})
                }
            }
        } catch (e) {
            err("Ticket Close Button Event: " + e);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};
