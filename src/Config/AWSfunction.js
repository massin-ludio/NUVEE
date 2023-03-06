import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'

let ack = 'AKIAYAA7XO2AVSW3P75Z'
let sk= '8kwGvSzfIvMp1ppZjR2CIxkWC/m3br9gU5gcmy1r'

const configuration: ConfigurationOptions = {
  region: 'us-east-1',
  secretAccessKey: sk,
  accessKeyId: ack
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName) => {
    var params = {
        TableName: tableName
    }

    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data)
        }
    })
}
export const putData = (tableName , data) => {
    var params = {
        TableName: tableName,
        Item: data
    }
    
    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    })
}