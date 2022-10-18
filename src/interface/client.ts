import {Client} from "discord.js";
import {intents, partials} from "../util/config/config";

export class TicketBot extends Client {
    constructor(token: string) {
        super({
            intents: intents,
            partials: partials
        });

        this.login(token)
    }
}
