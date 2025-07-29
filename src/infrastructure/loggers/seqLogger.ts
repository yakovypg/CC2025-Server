import Stream from "stream";

import pino, { Logger, LoggerOptions } from "pino";
import { createStream } from "pino-seq";

import { name, version } from "../../../package.json";

const createSeqLogger = (): Logger => {
  const logLevel: string = process.env.LOG_LEVEL ?? "info";
  const serverUrl: string = process.env.SEQ_SERVER_URI ?? "http://localhost:5341";
  const batchSizeLimit: number = Number(process.env.LOGGER_BATCH_SIZE_LIMIT) || 50;
  const maxBatchingTimeMs: number = Number(process.env.LOGGER_MAX_BATCHING_TIME_MS) || 1000;

  const seqStream: Stream.Writable = createStream({
    serverUrl,
    batchSizeLimit: batchSizeLimit,
    maxBatchingTime: maxBatchingTimeMs
  });

  const loggerOptions: LoggerOptions = {
    level: logLevel,
    base: { name, version },
    timestamp: pino.stdTimeFunctions.isoTime
  };

  return pino(loggerOptions, seqStream);
};

const logger: Logger = createSeqLogger();
export default logger;
