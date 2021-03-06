const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res, next) => {
const getAll = async (req, res) => {
    // #swagger.tags = ['Contact']

    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
// const getSingle = async (req, res, next) => {
const getSingle = async (req, res) => {
    // #swagger.tags = ['Contact']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res) => {
    // #swagger.tags = ['Contact']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const modifyContact = async (req, res) => {
    // #swagger.tags = ['Contact']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .replaceOne({ _id: userId }, contact);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contact']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);

    if (result.deletedCount > 0) {
        res.status(204).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = { getAll, getSingle, createContact, modifyContact, deleteContact };
