import {
    ChatInputCommandInteraction,
    EmbedBuilder, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {everybodyRoleID, ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add User to Ticket.')
        .addUserOption(option =>
            option
                .setName('ticket-user')
                .setDescription("Choose the user you want to add to the Ticket.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName("ticket-channel")
                .setDescription("Choose the ticket-channel you want to add a user.")
                .setRequired(false)
        ),
    async execute(interaction: any) {
        const newTicketUser = interaction.options.getUser("ticket-user")
        const choosenTicketChannel = interaction.options.getChannel("ticket-channel")

        if (newTicketUser != null) {
            if (choosenTicketChannel != null) {
                const addTicketUserEmbed = new EmbedBuilder()
                choosenTicketChannel.permissionOverwrites.create(everybodyRoleID, {ViewChannel: false})
                choosenTicketChannel.permissionOverwrites.create(newTicketUser.id, {
                    ViewChannel: true,
                    AttachFiles: true,
                    ChangeNickname: true,
                    EmbedLinks: true,
                    SendMessages: true,
                    UseApplicationCommands: true,
                    ManageChannels: false
                })
            } else {
                interaction.channel.permissionOverwrites.create(everybodyRoleID, {ViewChannel: false})
                interaction.channel.permissionOverwrites.create(newTicketUser.id, {
                    ViewChannel: true,
                    AttachFiles: true,
                    ChangeNickname: true,
                    EmbedLinks: true,
                    SendMessages: true,
                    UseApplicationCommands: true,
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
