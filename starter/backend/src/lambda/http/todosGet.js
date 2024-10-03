import cors from '@middy/http-cors'
import middy from '@middy/core'
import { createLogInfo } from '../../log-info/LogUtils.mjs'
import httpErrorHandler from '@middy/http-error-handler'
import { getTodoLogic } from '../../business-logic/todosLogic.js'

const log = createLogInfo('Event: Get todos')

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async (ev) => {
        console.log('Event: ', ev)

        const todoList = await getTodoLogic(ev);
        log.info('Generated url successfully!', todoList)
        return {
            statusCode: 200,
            body: JSON.stringify({
                items: todoList
            })
        }
    })
