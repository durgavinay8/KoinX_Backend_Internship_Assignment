# Cryptocurrency Data Application 

This is a server-side application built with Node.js and MongoDB that provides data for cryptocurrencies: Bitcoin (BTC), Matic (Polygon), and Ethereum (ETH).

## Deployment Link

http://koinxbackendinternshipassignment-env.eba-gnvbd3ng.ap-south-1.elasticbeanstalk.com/api/coin-info/

## Technologies Used

- **Backend:** Node.js (Express.js)
- **Database:** MongoDB with **`Time Series Collection`** for efficient storage and querying of cryptocurrency data.
- **API Integration:** Third-party cryptocurrency API from CoinGecko
- **Deployment**: AWS Elastic Beanstalk

## Supported Cryptocurrencies

Currently, the backend only supports the following three cryptocurrencies. The query parameter **coin** must be one of these values:

- `bitcoin`
- `matic-network`
- `ethereum`

## Features

- **Automated Updates**  
  A **cron job** runs every 2 hours to update the MongoDB **`Time Series Collection`** with the latest market values of cryptocurrencies (Bitcoin, Matic, and Ethereum).  

- **API Routes**  
  The application provides the following API endpoints:  
  -  **Get Current Market Stats**  
     Fetches the current market statistics (e.g., price, market cap) for a specified cryptocurrency. 
     - **Route**: `GET /api/coin-info/stats`
     - **Query Parameters**:
        ```
        {
            "coin": "bitcoin"  // Could be one of the supported cryptocurrencies (bitcoin, matic-network and ethereum)
        } 
        ```
     - **Sample Response**:
        ```
        {
            "price": 40000,
            "marketCap": 800000000,
            "24hChange": 3.4
        }
        ```
  -  **Get Standard Deviation**  
     Computes and returns the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.  
     - **Route**: `GET /api/coin-info/deviation`
     - **Query Parameters**:
        ```
        {
            "coin": "bitcoin"  // Could be one of the supported cryptocurrencies (bitcoin, matic-network and ethereum)
        } 
        ```
     - **Sample Response**:
        ```
        {
            "deviation": 4082.48
        }
        ```

## Database Design  

The application leverages **MongoDB** for storing and managing cryptocurrency data. Below are the key design aspects:  

### Time Series Collection  
- The database uses a **Time Series Collection**, a specialized feature of MongoDB designed to efficiently store and retrieve time-series data.  
- Each cryptocurrency's data is stored with a timestamp to support historical analysis and efficient querying of time-based metrics.  

### Key Fields  
- **crypto_currency**: Stores the name of the cryptocurrency (e.g., Bitcoin, Ethereum).  
- **price**: Stores the current price of the cryptocurrency, using `Decimal128` for high precision.  
- **market_cap**: Stores the market capitalization, also using `Decimal128` to handle large financial values precisely.  
- **change_24h**: Stores the percentage change in the last 24 hours, stored as `Decimal128` to capture precise values.  
- **timestamp**: A timestamp of when the data was recorded, with a default value of the current date and time.  

### Precision with Decimal128  
- `Decimal128` is used for financial data (e.g., price, market cap, change in 24h) to ensure that there are no floating-point inaccuracies, which is critical for cryptocurrency data.  

### Advantages  
- **Accuracy**: `Decimal128` ensures that cryptocurrency prices and market data are stored with high precision, preventing rounding errors.  
- **Efficiency**: MongoDB's Time Series Collection optimizes the database for handling large amounts of time-based data with quick retrieval times.