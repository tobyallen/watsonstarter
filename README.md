Watson Starter is a Simple Express + NodeJS setup designed for playing around with the Watson APIs.

First API implemented is the Natural Language Understanding. 
Clone the repo
Complete the prerequsites below (from https://github.com/watson-developer-cloud/natural-language-understanding-nodejs)
Run NPM install
Launch with "DEBUG=starter:* npm start"
Headover to localhost:3000/nluTest.html

Prerequisites
Sign up for an IBM Cloud account.
Download the IBM Cloud CLI.
Create an instance of the Natural Language Understanding service and get your credentials:
Go to the Natural Language Understanding page in the IBM Cloud Catalog.
Log in to your IBM Cloud account.
Click Create.
Click Show to view the service credentials.
Copy the apikey value, or copy the username and password values if your service instance doesn't provide an apikey.
Copy the url value.

Configuring the application
In the application folder, copy the .env.example file and create a file called .env

cp .env.example .env
Open the .env file and add the service credentials that you obtained in the previous step.

Example .env file that configures the apikey and url for a Natural Language Understanding service instance hosted in the US East region:

NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY=X4rbi8vwZmKpXfowaS3GAsA7vdy17Qh7km5D6EzKLHL2
NATURAL_LANGUAGE_UNDERSTANDING_URL=https://gateway-wdc.watsonplatform.net/natural-language-understanding/api
If your service instance uses username and password credentials, add the NATURAL_LANGUAGE_UNDERSTANDING_USERNAME and NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD variables to the .env file.
Example .env file that configures the username, password, and url for a Natural Language Understanding service instance hosted in the Sydney region:

NATURAL_LANGUAGE_UNDERSTANDING_USERNAME=522be-7b41-ab44-dec3-g1eab2ha73c6
NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD=A4Z5BdGENrwu8
NATURAL_LANGUAGE_UNDERSTANDING_URL=https://gateway-syd.watsonplatform.net/natural-language-understanding/api


Application was created using Express Generator
