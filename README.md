# CarCar

Team:

* Person 1 - Natalie Tang (Service)
* Person 2 - Alonso Rodriguez (Sales)

## Design
We used Automobile VOs to access the data with polling from the Inventory API in our own microservices.

## Service microservice

I created a "Service" model that represents someone who wants to input a service which includes all of the properties and the identified foreign key. In this case, the foreign key of the service would be "technician" because it is its own model in which we want the information from as a dropdown. I created an "AutomobileVO" model to access the information of automobiles in the inventory service, most importantly the VIN to compare to the service VIN so that it could have the VIP status.

## Sales microservice

I have models for the autoVO and also to create sales people and customers which are all connected by foreignkeys.
Auto is OnetoOne because we only can sell a car in our inventory once. The encoders attach to sales while employee only uses get_extra_data to get the sales persons name.
AutoVO gets the cars by polling and holds the data for sales.
Views are mostly get and post methods because that is what learn demands for.
I added a search to the sale history that filters by a employees name to combine the two pages for filtered history and all history.
