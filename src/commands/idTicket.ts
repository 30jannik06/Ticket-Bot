import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('id')
        .setDescription('Gives you the id of the Current Guild!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const idEmbed = new EmbedBuilder()
            .setColor(ticketEmbedColor)
            .setTitle("Server-ID")
            .setDescription("Server-ID: ``"+interaction.guild.id+"``")
            .setFooter({
                text: "Ticket Bot by .jannik#6908"
            })
        return interaction.reply({embeds: [idEmbed], ephemeral: true});
    },
};
