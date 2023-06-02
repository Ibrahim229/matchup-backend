
import { config } from 'dotenv';
config()
import twilio from 'twilio';


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


//send verification code token
export const sendVerification = async (number: string) => {
  return await client.verify
    .v2.services(process.env.TWILIO_VERIFICATION_SID!)
    .verifications.create({ to: `${number}`, channel: "sms", })

}

//check verification token
export const checkVerification = async (number: string, code: string) => {

  var verification_check = await client.verify.v2.services
    (process.env.TWILIO_VERIFICATION_SID!)
    .verificationChecks.create({ to: `${number}`, code: `${code}` });
  return verification_check.valid;

}
