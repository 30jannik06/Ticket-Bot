import {TicketBot} from "./interface/client";
import {token} from "./util/config/config";
import path from "node:path";
import fs from "node:fs";

export const client = new TicketBot(token);

//#region EventHandler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}
//#endregion EventHandler
