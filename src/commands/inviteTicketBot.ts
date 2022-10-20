import {ChatInputCommandInteraction, EmbedBuilder, hyperlink, SlashCommandBuilder} from "discord.js";
import {ticketEmbedColor} from "../util/config/config";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Sends the invite link for the Bot'),
    async execute(interaction: ChatInputCommandInteraction) {
        const inviteEmbed = new EmbedBuilder()
            .setColor(ticketEmbedColor)
            .setTitle("Invite Link")
            .setDescription("Use this link to invite the ticket bot!")
            .addFields({
                name: "Link:",
                value: hyperlink("Invite Link Here", "https://discord.com/oauth2/authorize?client_id=1031877662257467403&scope=applications.commands+bot&permissions=2416045072"),
                inline: false
            })
            .setFooter({
                text: "Ticket Bot by .jannik#6908",
                iconURL: interaction.user.displayAvatarURL({size: 4096, extension: "png"})
            })

        interaction.reply({embeds: [inviteEmbed]})
    },
};
