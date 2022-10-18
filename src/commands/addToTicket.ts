import {
    ChatInputCommandInteraction,
    EmbedBuilder, PermissionsBitField, roleMention,
    SlashCommandBuilder
} from "discord.js";
import {evnt} from "../util/helper/consoleHelper";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add User to Ticket.')
        .addUserOption(option =>
            option
                .setName('ticket-user')
                .setDescription("Choose the user you want to add to the Ticket."))
        .addChannelOption(option =>
            option
                .setName("ticket-channel")
                .setDescription("Choose the ticket-channel you want to add a user.")
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const newTicketUser = interaction.options.getUser("ticket-user", false)
        const choosenTicket = interaction.options.getChannel("ticket-channel", false)

        if (newTicketUser != null) {
            if (choosenTicket != null) {
                interaction.guild.channels.fetch(choosenTicket.id).then(ch => {
                    ch.permissionsFor(newTicketUser, false).add(
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.ChangeNickname,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.UseApplicationCommands)
                });
                interaction.reply({content: "``Channel name was changed!``", ephemeral: true});
            } else {
                interaction.channel.permissionsFor(newTicketUser, false).add(
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.ChangeNickname,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.UseApplicationCommands);
                //interaction.reply({content: "``Channel name was changed!``", ephemeral: true});
            }
        } else {
            const needNameEmbed = new EmbedBuilder()
                .setColor("#272727")
                .setTitle("Error")
                .setDescription("You have to enter a new name!")
            interaction.reply({embeds: [needNameEmbed], ephemeral: true})
        }

    },
}
;
