const express = require('express');
const request = require('supertest')
const testRouter = require('./routes/routetest')
const calculatevalue = require('./routes/calculatevalue')
const calculaterisk = require('./routes/calculaterisk')
const calculatequote = require('./routes/calculatequote')
const app = express();
app.use(express.json());

app.use('/test', testRouter)
app.use('/calculatevalue', calculatevalue)
app.use('/calculaterisk', calculaterisk)
app.use('/calculatequote', calculatequote)

describe('Check the existence and operation of the server', () => {
    it('test should exist and be a function', () => {
        expect(testRouter).toBeDefined(); //Checks it is a defined value/type - is boolean
        expect(typeof testRouter).toBe('function'); //Checked it is a function
      });
    it('#1 should return the expected response from the server if operational', async () => {
      const response = await request(app)
        .post('/test')
        .expect(200);
      expect(response.body).toBe("You're receiving a response!");
    });
  })

describe('Check API1 and the calculateValue function against test cases', () => {
    it('calculateValue should exist and be a function', () => {
      expect(calculatevalue).toBeDefined(); //Checks it is a defined value/type - is boolean
      expect(typeof calculatevalue).toBe('function'); //Checked it is a function
    });
    it('#1 should return the given example of Civic 2014 equals 6614', async () => {
      const response = await request(app)
        .post('/calculatevalue')
        .send({
          "model": "Civic",
          "year": 2014,
        })
        .expect(200);
        const expectedResult = ({
          "car_value": 6614
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#2 should return a correct test case Toyota 2000 equals 11600', async () => {
      const response = await request(app)
        .post('/calculatevalue')
        .send({
          "model": "Toyota",
          "year": 2000,
        })
        .expect(200);
        const expectedResult = ({
          "car_value": 11600
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#3 should return the test case of model being numbers', async () => {
      const response = await request(app)
        .post('/calculatevalue')
        .send({
          "model": "911",
          "year": 2000,
        })
        .expect(200);
        const expectedResult = ({
          "car_value": 2000
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#4 should return an error when using negative numbers', async () => {
      const response = await request(app)
        .post('/calculatevalue')
        .send({
          "model": "Civic",
          "year": -900,
        })
        const expectedResult = ({
          "error": "Invalid input. Please provide a valid model and year."
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#5 should return an error when using the wrong data type', async () => {
      const response = await request(app)
        .post('/calculatevalue')
        .send({
          "model": "Civic",
          "year": "Civic",
        })
        const expectedResult = ({
          "error": "Invalid input. Please provide a valid model and year."
      })    
      expect(response.body).toEqual(expectedResult);
    });
  });


  //api2
  describe('Check API2 and the calculateRisk function against test cases', () => {
    it('calculateRisk should exist and be a function', () => {
      expect(calculaterisk).toBeDefined(); //Checks it is a defined value/type - is boolean
      expect(typeof calculaterisk).toBe('function'); //Checked it is a function
    });
    it('#1 should return the given example resulting in 3', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes." 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 3
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#2 should identify all 5 trigger words', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "collide crash scratch bump smash" 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 5
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#3 should return a 1 when no triggers are met', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "I have no history of fault" 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 1
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#4 should return a 5 as the maximum rating', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "bump crash bump crash bump crash bump crash" 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 5
      })    
      expect(response.body).toEqual(expectedResult);
    });  
    it('#5 should return a 5 as the maximum rating', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "zzbuzzmpzz, zzcrzzshzz" 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 1
      })    
      expect(response.body).toEqual(expectedResult);
    });
    it('#6 should return an error if wrong data type', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": 5, 
      })
        .expect(400);
        const expectedResult = ({ error: "there is an error" })    
      expect(response.body).toEqual(expectedResult);
    }); 
    it('#7 should identify conjugations of trigger words', async () => {
      const response = await request(app)
        .post('/calculaterisk')
        .send({ 
          "claim_history": "collides, crashes, scratches, bumps, smashes" 
      })
        .expect(200);
        const expectedResult = ({
          "risk_rating": 5
      })    
      expect(response.body).toEqual(expectedResult);
    });
  });

  //api3
  describe('Check API3 and the calculatequote function against test cases', () => {
    it('calculateRisk should exist and be a function', () => {
      expect(calculatequote).toBeDefined(); //Checks it is a defined value/type - is boolean
      expect(typeof calculatequote).toBe('function'); //Checked it is a function
    });
    it('#1 should return the given example resulting in 3', async () => {
      const response = await request(app)
        .post('/calculatequote')
        .send({
            "car_value": 3346345,
          "risk_rating": 3
        })
        .expect(200);
        const expectedResult = ({
            "monthly_premium": 8365.862500000001,
            "yearly_premium": 100390.35
        })    
      expect(response.body).toEqual(expectedResult);
    });
  });