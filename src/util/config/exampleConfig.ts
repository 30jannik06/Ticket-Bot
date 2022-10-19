import {GatewayIntentBits, Partials} from "discord.js";

class Config {
    public token: string;
    public guildId: string;
    public clientId: string;

    public intents: any[];
    public partials: any[];

    public ticketCategoryID: string;
    public everybodyRoleID: string;
    public ticketEmbedColor: any;
    public ticketOpenButtonEmoji: string;
    public ticketCloseButtonEmoji: string;

    constructor() {
        this.token =
            "<BotTokenHere>";
        this.clientId = "<ClientIDhere>";
        this.guildId = "<GuildIDhere>";

        this.intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents]
        this.partials = [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message]

        this.ticketCategoryID = "<TicketCategoryIDHhere>"
        this.everybodyRoleID = "<EverybodyRoleIDHhere>";
        this.ticketEmbedColor = "#272727"; //<-- Must be a hex color
        this.ticketOpenButtonEmoji = "🎫";
        this.ticketCloseButtonEmoji = "📕";
    }
}

export const {
    token,
    guildId,
    clientId,
    intents,
    partials,
    ticketCategoryID,
    everybodyRoleID,
    ticketEmbedColor,
    ticketOpenButtonEmoji,
    ticketCloseButtonEmoji
} = new Config();
