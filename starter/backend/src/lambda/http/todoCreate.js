import cors from '@middy/http-cors'
import middy from '@middy/core'
import { createLogInfo } from '../../log-info/LogUtils.mjs'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodoLogic } from '../../business-logic/todosLogic.js'

const log = createLogInfo('Event: Create todo')

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async (ev) => {
        console.log('Event: ', ev)
        const taskTodo = await createTodoLogic(ev);
        log.info('Created success', {
            todo: taskTodo
        })
        return {
            statusCode: 201,
            body: JSON.stringify({
                item: taskTodo
            })
        }
    })

