import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";
import {evnt} from "../util/helper/consoleHelper";

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
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const newTicketName = interaction.options.getString("ticket-name", false)
        const choosenTicket = interaction.options.getChannel("ticket-channel", false)

        if (newTicketName != null) {
            if (choosenTicket != null) {
                interaction.guild.channels.fetch(choosenTicket.id).then(ch => {
                    ch.setName("" + newTicketName);
                });
                interaction.reply({content: "``Channel Name wurde geändert``", ephemeral: true});
            } else {
                interaction.channel.setName("" + newTicketName);
                interaction.reply({content: "``Channel Name wurde geändert``", ephemeral: true});
            }
        } else {
            const needNameEmbed = new EmbedBuilder()
                .setColor("#272727")
                .setTitle("Error")
                .setDescription("There was no name in this command input!")
            interaction.reply({embeds: [needNameEmbed], ephemeral: true})
        }

    },
};
