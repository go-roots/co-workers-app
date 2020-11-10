const ErrorResponse = require('../utils/errorResponse');

const advancedResults = (model, populate, type = 'all') => async (req, res, next) => {
    //Contains filtering and sorting via the query string
    //ex : ?select=firstName,lastName&sort=-cwpoints
    let query;
    let reqQuery = { ...req.query, role: { $ne: 'admin' } };

    //Fields to exclude
    const removeFields = ['status', 'activitySector', 'friends', 'select', 'sort', 'page', 'limit'];

    //Loop through excluded params and remove them from reqQuery
    //Reminder : objectName.propertyName or objectName["propertyName"]
    removeFields.forEach(param => delete reqQuery[param]);

    //Finding resource
    if (type == 'single') {
        query = model.findById(req.params.userId)
    } else {
        query = model.find(reqQuery);
    }

    /*The idea here is to first get the whole resource with all filters, and then...
    Select only the fields we need.
    This is done with query.select(name1 name2), but we want to replace " " by "," : */

    if (!req.query.select && req.user.role === 'user') {
        query.select('-messages -cwpoints -rfid -stats -electricityConsumptionLogs -billing'); //Default role='user' limitations
    }

    if (req.query.select && req.user.role === 'user') {
        const exclude = ['messages', 'cwpoints', 'rfid', 'stats', 'electricityConsumptionLogs', 'billing']
        const check = req.query.select.split(',');
        exclude.forEach(word => {
            if (check.includes(word)) {
                next(new ErrorResponse('Not authorized to access resource.', 401))
            }
        });
        const fields = req.query.select.replace(/,/g, ' ');
        query.select(fields);
    }

    if (req.query.select && req.user.role === 'admin') {
        const fields = req.query.select.replace(/,/g, ' ');
        query.select(fields);
    }

    //Then we allow a custom sorting :
    if (req.query.sort) {
        const sortBy = req.query.sort.replace(/,/g, ' ');
        query.sort(sortBy);
    } else { //Default sorting...
        query.sort('-createdAt');
    }

    //populate with virtual(s) attribute(s) 
    if (populate) {
        query = query.populate(populate);
    }

    //Results initiation
    let results;
    let modified = false;

    //Simulate pagination by limiting the number of displayed results
    let pagination = {};
    let total;

    //Define the number of docs, clearly not optimal...
    if (req.query.status || req.query.activitySector || req.query.friends) {
        //Executing the query :
        results = await query;

        //Filter on the status attr in User -> profile
        if (req.query.status) {
            results = results.filter(user => user.profile && user.profile.status === req.query.status);
        }

        //Filter on the activitySector attr in User -> profile
        if (req.query.activitySector) {
            results = results.filter(user => user.profile && user.profile.activitySector === req.query.activitySector);
        }

        //Filter on the friends attr in User
        if (req.query.friends) {
            results = results.filter(user => user.friends.friends.some(f => f.friend == req.user.id));
        }

        total = results.length;
        modified = true
    } else {
        total = await model.countDocuments();
    }


    if (req.query.page && req.query.limit) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit

        //and skipping certain results :
        query.skip(startIndex).limit(limit);

        if (total > endIndex) {
            pagination = {
                next: page + 1,
                page
            }
        }
        if (startIndex > 1) {
            pagination = {
                ...pagination,
                prev: page - 1
            }
        }
    }

    if (!modified) { //no status, no activitySector
        results = await query;
    }

    if (type === 'all' && req.query.page && req.query.limit) {
        res.advancedResults = {
            success: true,
            count: results.length,
            pagination,
            data: results
        };
    } else if (type === 'all') {
        res.advancedResults = {
            success: true,
            count: results.length,
            data: results
        };
    } else {
        res.advancedResults = {
            success: true,
            data: results
        };
    }

    next();
};

module.exports = advancedResults;