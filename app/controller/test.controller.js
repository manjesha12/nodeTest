
const agency = require('../model/agency');
const client = require('../model/client');
const { generateToken } = require('../helper/jwt');

/**
 * @description add agency 
 * @param  {} req
 * @param  {} res
 */
module.exports.register = async (req, res) => {
    try {
        let { AgencyId, Name, Address1, Address2, State, City, Phone_Number, ClientId, Email, PhoneNumber, TotalBill, ClientName } = req.body;

        let user = new agency({
            AgencyId, Name, Address1, Address2, State, City, Phone_Number,
        })

        await user.save(async function (error, result) {
            if (error) {
                console.log(error);
                res.json('agency is already exits')
            }
            else {
                console.log(result);
                let Client = new client({
                    ClientId, Email, PhoneNumber, TotalBill,
                    AgencyId: result.AgencyId,
                    Name: ClientName,
                });
                await Client.save(function (error1, result1) {
                    if (error1) {
                        console.log(error1);
                        res.json('client is already exits')
                    }
                    else {
                        const jwtToken = generateToken({ id: result1.ClientId, });
                        res.json(jwtToken);
                    }
                })

            }
        });
    }
    catch (error) {
        res.json('Something went wrong');
    }
}

module.exports.updateClient = async (req, res) => {
    try {
        let { Email, PhoneNumber, TotalBill, ClientName } = req.body;
        let { clientId } = req.params;
        let clientData = await client.findOneAndUpdate(
            { ClientId: clientId }, { Email, PhoneNumber, TotalBill, ClientName }, {
            upsert: false
        }
        )
        res.json(clientData)

    } catch (error) {
        res.json('Something went wrong');
    }
}

module.exports.getData = async (req, res) => {
    try {

        let data = await agency.aggregate([

            {
                $lookup: {
                    from: 'clients',
                    localField: 'AgencyId',
                    foreignField: 'AgencyId',
                    as: "copies_sold"
                }
            },
            {
                $project: {
                    agencyName: 1,
                    clientName: { $arrayElemAt: ["$copies_sold.name", 1] },
                    TotalBill: { $arrayElemAt: ["$copies_sold.TotalBill", 1] },
                  
                }
            }


        ])
        res.json(data);
    } catch (error) {
        res.json('Something went wrong');
    }
}