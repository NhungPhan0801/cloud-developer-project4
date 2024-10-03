import cors from "@middy/http-cors";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createLogInfo } from '../../log-info/LogUtils.mjs'
import { deleteTodoLogic } from "../../business-logic/todosLogic.js";

const log = createLogInfo('Event: Delete todo!')

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async (ev) => {
        console.log('Event: ', ev)
        const todoId = await deleteTodoLogic(ev);
        log.info('Deleted successfully!', {
            todoId: todoId
        })
        return {
            statusCode: 200,
            body: 'Deleted successfully!'
        }
    })
