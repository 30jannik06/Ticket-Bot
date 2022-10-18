import {GatewayIntentBits, Partials} from "discord.js";

class Config {
    public token: string;
    public guildId: string;
    public clientId: string;

    public intents: any[];
    public partials: any[];

    constructor() {
        this.token =
            "<BotTokenHere>";
        this.clientId = "<ClientIDhere>";
        this.guildId = "<GuildIDhere>";

        this.intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents]
        this.partials = [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message]
    }
}

export const {
    token,
    guildId,
    clientId,
    intents,
    partials,
} = new Config();
