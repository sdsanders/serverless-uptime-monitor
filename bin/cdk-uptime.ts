#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import 'source-map-support/register';
import { CdkUptimeStack } from '../lib/cdk-uptime-stack';

const app = new App();
new CdkUptimeStack(app, 'CdkUptimeStack');
