import {WebhookClient} from "discord.js";

export class WebhookHelper {
    constructor(webhookID: string, webhookToken: string, embed: any) {

        const webhookClient = new WebhookClient({
            id: webhookID,
            token: webhookToken,
        });

        webhookClient.send({
            embeds: [embed]
        });
    }

}
