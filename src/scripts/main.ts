const mail = atob('YWJvYmlqYXhAZ21haWwuY29t');

document.getElementById('email').setAttribute('href', `mailto:${mail}`);
document.querySelector('.email').innerHTML = mail;