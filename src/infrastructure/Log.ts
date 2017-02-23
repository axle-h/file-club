var winston = require('winston');

import { Logger, LoggerOptions, Transport, ConsoleTransportOptions, ConsoleTransportInstance } from "winston";

export interface ILog {
    
}


class Log implements ILog {
    constructor() {
        
        var consoleTransportOptions: ConsoleTransportOptions = { json: false, timestamp: true };
        
        var consoleTransportInstance: ConsoleTransportInstance = {
            formatQuery: x => x,
            normalizeQuery: x => x
            formatResults: (results, options) => results
            logException: (msg: string, meta: Object, callback: () => { }
        };
        
        var settings = {
            transports: [
                new Transport(consoleTransportOptions),
                new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
            ],
            exceptionHandlers: [
                new (winston.transports.Console)({ json: false, timestamp: true }),
                new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
            ],
            exitOnError: false
        };
        
        var logger = new Logger(settings);
    }
} 