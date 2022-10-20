import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {err, evnt} from "../util/helper/consoleHelper";
import {everybodyRoleID, ticketCategoryID, ticketCloseButtonEmoji, ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Create new Ticket Channel.')
        .addChannelOption(option =>
            option
                .setName("closeticketchannel")
                .setDescription("Requires the channel of the ticket to be closed.")
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction: ChatInputCommandInteraction) {
        const closeTicketChannel = interaction.options.getChannel('closeticketchannel');

        const ticketCloseEmbed = new EmbedBuilder()
            .setColor(ticketEmbedColor)
            .setTitle("Ticket Closed")
            .setDescription("The ticket will be closed in 30 sec.")
            .setFooter({
                text: "Ticket-Bot by .jannik#6908",
                iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
            })

        try {
            if (closeTicketChannel != null) {
                interaction.guild.channels.fetch(closeTicketChannel.id).then(ch => {
                    ch
                    setTimeout(() => {
                        ch.delete();
                    }, 30000)
                })
            } else {
                interaction.reply({embeds: [ticketCloseEmbed]})
                setTimeout(() => {
                    interaction.channel.delete();
                }, 30000)
            }
        } catch (e) {
            err("Ticket Close Button Event: " + e);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};
