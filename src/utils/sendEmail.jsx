import emailjs from '@emailjs/browser';

export const sendEmail = (email, code) => {
  const templateParams = {
    to_email: email,
    message: code
  };

  emailjs.send(
    'service_5a6i1gc',  
    'template_8npvi3h', 
    templateParams,
    'kK2cdPoiL4pT-YY8i'
  )
    .then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
};
