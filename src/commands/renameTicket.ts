import {
    ChatInputCommandInteraction,
    EmbedBuilder, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {evnt} from "../util/helper/consoleHelper";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Create new Ticket Channel.')
        .addStringOption(option =>
            option
                .setName('ticket-name')
                .setDescription("The new channel name!")
        )
        .addChannelOption(option =>
            option
                .setName("ticket-channel")
                .setDescription("Choose the Ticket you want to rename")
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction: ChatInputCommandInteraction) {
        const newTicketName = interaction.options.getString("ticket-name", false)
        const choosenTicket = interaction.options.getChannel("ticket-channel", false)

        if (newTicketName != null) {
            if (choosenTicket != null) {
                interaction.guild.channels.fetch(choosenTicket.id).then(ch => {
                    ch.setName("" + newTicketName);
                });
                interaction.reply({content: "``Channel name was changed!``", ephemeral: true});
            } else {
                interaction.channel.setName("" + newTicketName);
                interaction.reply({content: "``Channel name was changed!``", ephemeral: true});
            }
        } else {
            const needNameEmbed = new EmbedBuilder()
                .setColor(ticketEmbedColor)
                .setTitle("Error")
                .setDescription("You have to enter a new name!")
            interaction.reply({embeds: [needNameEmbed], ephemeral: true})
        }

    },
};
