import cors from "@middy/http-cors";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createLogInfo } from '../../log-info/LogUtils.mjs'
import { updateTodoLogic } from "../../business-logic/todosLogic.js";

const log = createLogInfo('Event: update todo task!')

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async (ev) => {
        console.log('Event: ', ev)
        const updatedTodo = await updateTodoLogic(ev);
        log.info('Updated task successfully! ', {
            updatedTodo
        })
        return {
            statusCode: 200,
            body: 'Task was updated successfully!'
        }
    })
