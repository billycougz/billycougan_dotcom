console.log("smsTrigger start");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = event => {
  const message = createMessage(event);
  sendMessage(message);
  const message2 = createMessage(mapRecords(event));
  sendMessage(message2);
  console.log("smsTrigger end");
  // return Promise.resolve("Successfully processed DynamoDB record");
};

function createMessage(event) {
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);
  });
  console.log(JSON.stringify(event, null, 2));
  return JSON.stringify(event, null, 2);
}

function mapRecords(event) {
  event.Records = event.Records.map(record => ({
    new: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage),
    old: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage)
  }));
  return event;
}

function sendMessage(message) {
  // Create publish parameters
  var params = {
    Message: message,
    PhoneNumber: "+13155349166"
  };
  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function(data) {
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function(err) {
      console.error(err, err.stack);
    });
}
