const ApiError = require("../exceptions/api-error");
const User = require("../models/User")

module.exports = async function (req, res, next) {
    try {
        const { author,title, category, date, sort, page, limit, published } = req.query;
        req.queryParams = {}


        if(page){
            req.queryParams.page = page
        }

        if(limit){
            req.queryParams.limit = limit
        }

        // author query
        if (author) {
            const postAuthor = await User.findOne({ email: author });

            
                req.queryParams.userId = postAuthor?._id
            
        }

        if (title) {
            req.queryParams.title = {$regex: title};
        }


        // category query

       if (category && category !== "all") {
            req.queryParams.category = category
        }

        // date query
        if (date === 'today') {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);

            req.queryParams.createdAt = {
                $gte: todayStart,
                $lte: todayEnd,
            };
        } else if (date === 'this week') {
            const startOfThisWeek = new Date();
            startOfThisWeek.setHours(0, 0, 0, 0);
            startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());

            const endOfThisWeek = new Date();
            endOfThisWeek.setHours(23, 59, 59, 999);
            endOfThisWeek.setDate(endOfThisWeek.getDate() + (6 - endOfThisWeek.getDay()));

            req.queryParams.createdAt = {
                $gte: startOfThisWeek,
                $lte: endOfThisWeek,
            };
        } else if (date === 'this month') {
            const startOfThisMonth = new Date();
            startOfThisMonth.setHours(0, 0, 0, 0);
            startOfThisMonth.setDate(1);

            const endOfThisMonth = new Date(startOfThisMonth);
            endOfThisMonth.setMonth(startOfThisMonth.getMonth() + 1);
            endOfThisMonth.setDate(0);
            endOfThisMonth.setHours(23, 59, 59, 999);

            req.queryParams.createdAt = {
                $gte: startOfThisMonth,
                $lte: endOfThisMonth,
            };
        }

        if(published){
            req.queryParams.published = true
        }

        req.queryParams.sort = sort;

        next()

    } catch (e) {
        console.log(e)
    }
}