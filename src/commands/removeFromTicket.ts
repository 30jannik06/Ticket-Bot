import {
    ChatInputCommandInteraction,
    EmbedBuilder, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove User from Ticket.')
        .addUserOption(option =>
            option
                .setName('ticket-user')
                .setDescription("Choose the user you want to remove from the Ticket.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName("ticket-channel")
                .setDescription("Choose the ticket-channel you want to remove a user.")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction: any) {
        const newTicketUser = interaction.options.getUser("ticket-user")
        const choosenTicketChannel = interaction.options.getChannel("ticket-channel")

        if (newTicketUser != null) {
            if (choosenTicketChannel != null) {
                choosenTicketChannel.permissionOverwrites.edit(newTicketUser.id, {
                    ViewChannel: false,
                    AttachFiles: false,
                    ChangeNickname: false,
                    EmbedLinks: false,
                    SendMessages: false,
                    UseApplicationCommands: false,
                    ManageChannels: false
                })
            } else {
                interaction.channel.permissionOverwrites.edit(newTicketUser.id, {
                    ViewChannel: false,
                    AttachFiles: false,
                    ChangeNickname: false,
                    EmbedLinks: false,
                    SendMessages: false,
                    UseApplicationCommands: false,
                    ManageChannels: false
                })
            }
        } else {
            const needNameEmbed = new EmbedBuilder()
                .setColor(ticketEmbedColor)
                .setTitle("Error")
                .setDescription("You have to enter a new name!")
            await interaction.reply({embeds: [needNameEmbed], ephemeral: true})
        }
    },
}
;
