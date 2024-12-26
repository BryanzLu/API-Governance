// import { Injectable } from '@nestjs/common';
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Injectable()
// export class DynamoDBService {
//   private client: DynamoDBDocumentClient;

//   constructor() {
//     const dynamoDbClient = new DynamoDBClient({
//       region: process.env.AWS_REGION ?? "default",
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "default",
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "default",
//       },
//     });
//     console.log("region", process.env.AWS_REGION)
//     console.log("accessKeyId", process.env.AWS_ACCESS_KEY_ID)
//     console.log("secretAccessKey", process.env.AWS_SECRET_ACCESS_KEY)
//     this.client = DynamoDBDocumentClient.from(dynamoDbClient);
//   }

//   async postItem(dbName: string, item: Record<string, any>){
//     const command = new PutCommand({TableName: dbName, Item: item})
//     return await this.client.send(command)
//   }

//   async getItem(dbName: string, key: Record<string, any>){
//     const command = new GetCommand(({TableName: dbName, Key: key}))
//     console.log("hello")
//     return await this.client.send(command)
//   }

// }
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DynamoDBService {
  private client: DynamoDBDocumentClient;
  constructor() {
    const dynamoDbClient = new DynamoDBClient({
      region: process.env.AWS_REGION ?? 'default',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'default',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'default',
      },
    });
    this.client = DynamoDBDocumentClient.from(dynamoDbClient);
  }

  async putItem(tableName: string, item: Record<string, any>) {
    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    return await this.client.send(command);
  }

  async getItem(tableName: string, key: Record<string, any>) {
    const command = new GetCommand({
      TableName: tableName,
      Key: key,
    });
    return await this.client.send(command);
  }
}
