const accountSid = String(process.env.SID); 
const authToken = String(process.env.AUTH); 
const client = require('twilio')(accountSid, authToken);

send_sms = (message,number) =>{
  client.messages 
      .create({ 
         body: message,  
         messagingServiceSid: String(process.env.MSGSID),
         to: number
       }) 
      .then(message => console.log(message.sid, message.status)) 
      .done();
}

module.exports = { send_sms }
