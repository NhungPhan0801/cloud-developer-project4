import cors from "@middy/http-cors";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createLogInfo } from '../../log-info/LogUtils.mjs'
import { addAttachMentLogic } from "../../business-logic/todosLogic.js";

const log = createLogInfo('Event: Generate URL')

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async (ev) => {
        console.log('Event: ', ev);
        const urlAtc = await addAttachMentLogic(ev);
        log.info('Generated url successfully!', {
            uploadUrl: urlAtc
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                uploadUrl: urlAtc
            })
        }
    })