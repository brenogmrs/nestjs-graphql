import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const rpcExceptionError = (logger: Logger, error: Error) => {
    logger.error(`ERROR: ${JSON.stringify(error)}`);
    throw new RpcException(error.message);
};
