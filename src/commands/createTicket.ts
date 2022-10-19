import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";
import {evnt} from "../util/helper/consoleHelper";
import {everybodyRoleID, ticketCategoryID, ticketCloseButtonEmoji, ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create new Ticket Channel.')
        .addStringOption(option =>
            option
                .setName('beschreibung')
                .setDescription('(optional) Falls du möchtest gib hier dein Problem an.')
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const ticketReason = interaction.options.getString('beschreibung');

        function createTicketChannel() {
            const ticketID = (Math.random() * (99999 - 11111) + 0).toFixed(0)
            const createdChannel = interaction.guild.channels.create({
                name: "Ticket-" + ticketID
            })

            const ticketEmbed = new EmbedBuilder()
                .setColor(ticketEmbedColor)
                .setTitle("Ticket: " + ticketID)
                .setDescription("Please tell us your problem in this channel!")
                .addFields({
                    name: "Ticket-Creator: ",
                    value: interaction.user.tag,
                    inline: true
                }, {
                    name: "Creator-ID",
                    value: interaction.user.id,
                    inline: true
                })
                .setFooter({
                    text: "Bot by .jannik#6908",
                    iconURL: "" + interaction.guild.iconURL({size: 4096, extension: "png", forceStatic: false})
                })

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticketclose')
                        .setLabel('Close Ticket')
                        .setEmoji(ticketCloseButtonEmoji)
                        .setStyle(ButtonStyle.Primary),
                );

            createdChannel.then(ch => {
                ch.setParent(ticketCategoryID)
                ch.send({embeds: [ticketEmbed], components: [row]})
                ch.permissionOverwrites.create(everybodyRoleID, {ViewChannel: false})
                ch.permissionOverwrites.create(interaction.user.id, {
                    ViewChannel: true,
                    AttachFiles: true,
                    ChangeNickname: true,
                    EmbedLinks: true,
                    SendMessages: true,
                    UseApplicationCommands: true,
                    ManageChannels: false
                })


                const channelCreateEmbed = new EmbedBuilder()
                    .setColor(ticketEmbedColor)
                    .setTitle("Ticket Created")
                    .setDescription(`Ticket has been Created! <#${ch.id}>`)
                    .setFooter({
                        text: "Ticket-Bot by .jannik#6908",
                        iconURL: interaction.guild.iconURL({size: 4096, extension: "png"})
                    })
                return interaction.reply({embeds: [channelCreateEmbed], ephemeral: true});
            });
        }

        createTicketChannel();
    },
};
