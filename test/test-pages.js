
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let User = require('../src/models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let apps = require('../index.js');
let should = chai.should();
chai.use(chaiHttp);

describe('/register', () => {
    it('it should not POST a user without phone field', (done) => {
        let user = {
            name: "ahmed3",
            email: "ahmed5@gmail.com",
            phone: "0122113532",
            password: "123456789"
        }
        chai.request('http://localhost:3000')
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
    });

});
