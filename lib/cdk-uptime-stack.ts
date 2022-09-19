import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkUptimeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
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
