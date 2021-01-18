#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkUptimeStack } from '../lib/cdk-uptime-stack';

const app = new cdk.App();
new CdkUptimeStack(app, 'CdkUptimeStack');
