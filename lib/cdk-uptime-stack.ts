import * as cdk from '@aws-cdk/core';
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { Duration } from '@aws-cdk/core';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export class CdkUptimeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new Function(this, 'UptimeHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('resources'),
      handler: 'uptime.check',
      environment: {
        URL: 'https://google.com',
        EMAIL: 'test@test.com'
      }
    });
    const handlerPolicyStatement = new PolicyStatement();
    handlerPolicyStatement.addActions('ses:SendEmail');
    handlerPolicyStatement.addResources('*');
    handler.role?.addToPrincipalPolicy(handlerPolicyStatement);

    const target = new LambdaFunction(handler);

    new Rule(this, 'UptimeRule', {
      schedule: Schedule.rate(Duration.minutes(1)),
      targets: [target],
    });
  }
}
