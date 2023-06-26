const NinoxMap = require('../../models/NinoxMap');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

exports.get_templateMaps = catchAsync(async (req, res) => {
    const { limit = 20, page = 0 } = req.query;
    const templateMaps = await NinoxMap.find()
        .skip(limit * page)
        .limit(limit);
    return res.status(200).json({ templateMaps });
});

exports.add_templateMaps = catchAsync(async (req, res, next) => {
    try {
        const templateMap = await NinoxMap.create({ ...req.body });
        return res.status(200).json({ templateMap });
    } catch (err) {
        if (err.code == 11000) {
            return next(new AppError('The table is already used', 400));
        }
    }
});

exports.delete_templateMap = catchAsync(async (req, res) => {
    const { id } = req.params;
    await NinoxMap.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Deleted successfully' });
});

exports.update_templateMap = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const updated_template = await NinoxMap.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).json({ templateMap: updated_template });
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                message: 'The template map for table already',
            });
        }
    }
});

exports.search_templateMap = catchAsync(async (req, res) => {
    const { search } = req.query;

    const regex = new RegExp(search, 'i');
    let templateMaps = await NinoxMap.find({ tableName: regex });

    return res.status(200).json({ templateMaps });
});
