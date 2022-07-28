# Continuous Delivery Sprint

[Google Doc: Continuous Delivery Sprint Instructions](https://docs.google.com/document/d/e/2PACX-1vR5w4OtwQ9kH3s70y3oY2rJ5OZLX8GvG8DXSduDi9zZLfiId7oCDl-3zZjrKz2U_SBiUOwcY8i7PBM5/pub)

[Additional Heroku CD Pipeline notes](https://docs.google.com/document/d/e/2PACX-1vRhJ4KOlEX4NE6vhb-8m9WC2ugm9LqNEWbcFvugg8A1JZ__9kwVVnzRzXxxyHW_idqWQYC1D3xNSTKe/pub)

Project Inception Meetings
 - [EN](https://www.infoq.com/articles/project-inception-meeting/)
 - [JA](https://www.infoq.com/jp/articles/project-inception-meeting/?itm_source=infoq_en&itm_medium=link_on_en_item&itm_campaign=item_in_other_langs)


## ⚠️ Notes on Heroku setup ⚠️

Applications must support and enable SSL to connect to a Heroku Postgres database. 
Add the following setting to the Heroku environment variables to enable SSL connection.

```
PGSSLMODE=no-verify
```

There is another way to enable SSL connection by adding a query parameter to the database URL when connecting to the database.
Please see the following document for details.

- [Connecting to Heroku Postgres Databases from Outside of Heroku](https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku#ssl)  
- [Connecting in Node.js](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js)