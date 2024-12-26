import { Module } from "@nestjs/common";
import { DynamoDBController } from "./controllers/dynamodb.controller";
import { DynamoDBService } from "./services/dynamodb.service";

@Module({
    imports: [],
    controllers: [DynamoDBController],
    providers: [DynamoDBService],
  })
  export class DynamoDBModule {}