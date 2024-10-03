import AWSXRay from "aws-xray-sdk-core";
import {DynamoDB} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocument} from "@aws-sdk/lib-dynamodb";
const dynamoDbXRay = AWSXRay.captureAWSv3Client(new DynamoDB())
const dynamoDbClient = DynamoDBDocument.from(dynamoDbXRay)

// Get evironment variable
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_CREATED_AT_INDEX
const attachmentsS3Bucket = process.env.TODO_ATTACHMENTS_S3_BUCKET

export async function getDbTodoAccess(userId) {
    return await dynamoDbClient.query({
        TableName: todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
        IndexName: todosIndex,
        ScanIndexForward: false
    })
}

export async function createDbTodoAccess(todo) {
    await dynamoDbClient.put({
        TableName: todosTable,
        Item: todo
    })
}

export async function updateDbTodoAccess(userId, todoId, updatedTodo) {
    await dynamoDbClient.update({
        TableName: todosTable,
        Key: {
            userId,
            todoId
        },
        UpdateExpression: 'set done = :done',
        ExpressionAttributeValues: {
            ':done': updatedTodo.done
        },
    })
}

export async function updateDbTodoAttachmentUrlAccess(userId, todoId, imageId) {
    await dynamoDbClient.update({
        TableName: todosTable,
        Key: {
            userId,
            todoId
        },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': `https://${attachmentsS3Bucket}.s3.amazonaws.com/${imageId}`
        },
    })
}

export async function deleteDbTodoAccess(userId, todoId) {
    await dynamoDbClient.delete({
        TableName: todosTable,
        Key: {
            userId,
            todoId
        }
    })
}