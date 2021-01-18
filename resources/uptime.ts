import fetch from 'node-fetch';
import * as aws from 'aws-sdk';
const ses = new aws.SES();

exports.check = async () => {
  const response = await fetch(process.env.URL as string);

  if (response.status === 200) {
    console.log('up');

    return;
  }

  console.log('down', response.status);

  const params = {
    Destination: {
      ToAddresses: [process.env.EMAIL as string]
    },
    Message: {
      Body: {
        Text: {
          Data: `Down - ${response.status}`
        }    
      },
      Subject: {
        Data: `Down - ${response.status}`
      }
    },
    Source: process.env.EMAIL as string
  };

  await ses.sendEmail(params).promise();

  console.log('email sent');

  return;
}