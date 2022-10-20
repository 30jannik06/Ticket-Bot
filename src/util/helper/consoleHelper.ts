/**
 * Best Version for
 * chalk@4.1.2
 */
import chalk from "chalk";
class ConsoleHelper {
    async clog(msg: string) {
        /**
         * Sends normal Log Message to Console
         */
        console.log(chalk.bgYellow("📗[BOT]") + " " + chalk.white(msg));
    }
    async err(msg: string) {
        /**
         * Sends error Message to Console
         */
        console.error(chalk.bgRed("📕[ERROR]") + " " + chalk.white(msg));
    }
    async warn(msg: string) {
        /**
         * Sends warn Message to Console
         */
        console.warn(chalk.bgCyan("📙[WARN]") + " " + chalk.white(msg));
    }
    async cmd(msg: string) {
        /**
         * Sends "Command" tagged log to Console
         */
        console.log(chalk.bgBlue("📘[CMD]") + " " + chalk.white(msg));
    }
    async evnt(msg: string) {
        /**
         * Sends "Event" tagged log to Console
         */
        console.log(chalk.bgGray("📓[EVENT]") + " " + chalk.white(msg));
    }

    async dbLog(msg: string) {
        /**
         * Sends "DATABASE" tagged log to Console
         */
        await console.log(chalk.bgMagenta("📓[DATABASE]") + " " + chalk.white(msg));
    }
    async clear() {
        console.clear();
    }
}

export const { clog, err, warn, cmd, evnt, clear, dbLog } = new ConsoleHelper();
