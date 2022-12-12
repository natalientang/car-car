# CarCar

Team:

* Natalie Tang - Service
* Alonso Rodriguez - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

I have models for the autoVO and also to create sales people and customers which are all connected by foreignkeys.
Auto is OnetoOne because we only can sell a car in our inventory once. The encoders attach to sales while employee only uses get_extra_data to get the sales persons name.
AutoVO gets the cars by polling and holds the data for sales.
Views are mostly get and post methods because that is what learn demands for.
I added a search to the sale history that filters by a employees name to combine the two pages for filtered history and all history.
