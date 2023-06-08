const {
    NINOX_API_KEY,
    NINOX_BASE_API,
    NINOX_DATABASE_ID,
    NINOX_TEAM_ID,
    NINOX_FIRST_TABLE_ID,
} = require('./config/keys');
const validator = require('email-validator');
const axios = require('axios').default;
let baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;
const fs = require('fs');

const isEmail = (phone) => {
    return validator.validate(phone);
};

const getAllData = async () => {
    let page = 0;
    let records = [];
    while (true) {
        try {
            const res = await axios.get(
                `${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records?page=${page}&perPage=5000`,

                {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
                }
            );
            records = records.concat(res.data);
            if (!res.data.length) break;
            page++;
        } catch (err) {}
    }
    return records;
};

const deleteRecords = async (records) => {
    const recordIds = records.map((record) => ({ id: record.id, _deleted: true, fields: {} }));
    console.log(NINOX_API_KEY, NINOX_FIRST_TABLE_ID);
    const res = await axios.post(`${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records`, recordIds, {
        headers: { Authorization: `Bearer ${NINOX_API_KEY}` },
    });
};

const getDuplicatesClusterWithPhone = async (records) => {
    let duplicateListCluster = {};

    records.forEach(async (record) => {
        if (!record.fields.Phone) return;
        const last_seven_digits = record.fields.Phone.substr(-7);

        if (duplicateListCluster[last_seven_digits]) {
            duplicateListCluster[last_seven_digits] = [...duplicateListCluster[last_seven_digits], record];
        } else {
            duplicateListCluster[last_seven_digits] = [record];
        }
        // const recordsWithPhone = await getAllWithPhone(record.fields.Phone);

        // if (!recordsWithPhone) return;
        // console.log(recordsWithPhone);
        // recordsWithPhone.forEach((record) => {
        //     if (!searchedIds.includes(record.D)) {
        //         searchedIds.push(record.D);
        //     }
        // });
        // if (recordsWithPhone.length > 1) {
        //     duplicateListCluster.push(recordsWithPhone);
        // }
    });

    // console.log(duplicateListCluster);



    return duplicateListCluster;
};

const updateData = async (records) => {
    try {
        await axios.post(`${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records`, records, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
        });
    } catch (err) {
        console.log(err.response?.data);
    }
};

const updateManyForPhoneAndEmail = async (records) => {
    try {
        await axios.post(`${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records`, [...records], {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
        });
    } catch (err) {
        console.log(err.response?.data);
    }
};

const mergeClusters = async (recordClusters) => {
    let dataToBeDeleted = [];
    let dataToBeUpdated = [];
    Object.keys(recordClusters).forEach(async (key) => {
        let cluster = recordClusters[key];
        if (key == '+') return;
        if (cluster.length < 2) return;

        let offerta = [];
        cluster.sort((a, b) => new Date(a.modifiedAt) - new Date(b.modifiedAt));

        let oldestRecord = cluster[0];
        let newestRecord = cluster[cluster.length - 1];

        // combining offerta
        recordClusters[key].forEach((record) => {
            if (record.fields['OFFERTA']) {
                offerta = offerta.concat(record.fields['OFFERTA']);

                offerta = offerta.filter((item, pos) => offerta.indexOf(item) === pos); //filtered
            }
        });

        // removing first and last item
        cluster.shift();

        dataToBeUpdated = dataToBeUpdated.concat({
            id: oldestRecord.id,
            fields: { offerta, email: newestRecord.fields.Email },
        });

        dataToBeDeleted = dataToBeDeleted.concat(cluster);
    });
    await updateData(dataToBeUpdated);
    await deleteRecords(dataToBeDeleted);
};

const duplicatePrevent = async () => {
    const records = await getAllData();
    const recordsToBeUpdated = [];
    const updatedRecords = records.map((record) => {
        if (!isEmail(record.fields.Phone)) return record;

        recordsToBeUpdated.push({
            id: record.id,
            fields: {
                Phone: record.fields.Email,
                Email: record.fields.Phone,
            },
        });
        return {
            ...record,
            fields: { ...records.fields, Phone: record.fields.Email, Email: record.fields.Phone },
        };
    });

    await updateManyForPhoneAndEmail(recordsToBeUpdated);
    const duplicateCluster = await getDuplicatesClusterWithPhone(updatedRecords);
    await mergeClusters(duplicateCluster);
};

module.exports = duplicatePrevent;

// duplicatePrevent().catch((err) => {
//     console.log(err);
// });

// const getRecordWithPhone = async (Phone) => {
//     const response = await axios.get(
//         `${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records?filters={"D":"${Phone}"}`,

//         {
//             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
//         }
//     );
//     const record = response.data;
//     return record;
// };

// const records = getRecordWithPhone('+3933803476765')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// console.log(records);

// const getAllWithPhone = async (phone) => {
//     try {
//         const response = await axios.get(
//             `${baseNinoxTableURL}/${NINOX_FIRST_TABLE_ID}/records?filters={"D":${phone}}`,

//             {
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
//             }
//         );
//         return response.data;
//     } catch (err) {
//         console.log(err.response?.data);
//     }
// };
