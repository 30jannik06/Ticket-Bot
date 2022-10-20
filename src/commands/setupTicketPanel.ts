import {
    ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    EmbedBuilder, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {ticketEmbedColor, ticketOpenButtonEmoji} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Creates the ticket panel!')
        .addChannelOption(option =>
            option
                .setName("setupchannel")
                .setDescription("Channel in which the panel will be created")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction: any) {
        const setupChannel = interaction.options.getChannel("setupchannel")

        const ticketPanelEmbed = new EmbedBuilder()
            .setColor(ticketEmbedColor)
            .setTitle("Ticket System")
            .setDescription("Click on the button to create a support ticket!")
            .setFooter({
                text: "Ticket-Bot by .jannik#6908",
                iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
            })
        const ticketPanelButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("createticketbutton")
                .setLabel("Create Ticket")
                .setStyle(ButtonStyle.Success)
                .setEmoji(ticketOpenButtonEmoji)
        )

        interaction.guild.channels.fetch(setupChannel.id)
            .then(ch => {
                ch.send({embeds: [ticketPanelEmbed], components: [ticketPanelButton]});
            })

        const ticketPanelCreatedEmbed = new EmbedBuilder()
            .setColor(ticketEmbedColor)
            .setTitle("Setup Done")
            .setDescription("The ticket panel has been created.")
            .setFooter({
                text: "Ticket-Bot by .jannik#6908",
                iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
            })
        interaction.reply({embeds: [ticketPanelCreatedEmbed], ephemeral: true})
    },
};
