const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const InvitationModel = require('@core/models/invitation/invitation.model');

const _ = require('lodash');
const { Populate } = require('./invitation-populate');
const { Filter } = require('./invitation-filter');

const read = async (req, res) => {
  try {
    const qRead = await getRead(req);

    Promise.all([qRead]).then(async (responses) => {
      const data = responses[0];

      if (_.isEmpty(data) === false) {
        return Ok(data, 'Retrieve data successfully.', res);
      } else {
        return ErrorNotFound('Data not found.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getRead(req) {
  const access = req.access;
  const pUniq = req.params.uniq;
  const where = req.query.where;
  const populate = req.query.with;

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Populate(f, populate, access);
    }
  };

  let qRead;
  if (access === 'private') {
    qRead = await InvitationModel.query().first().findById(pUniq).modify(fWhere).modify(fWith);
  } else {
    qRead = await InvitationModel.query()
      .first()
      .modify('publicSelects')
      .modify('filterCode', pUniq)
      .modify(fWhere)
      .modify(fWith);
  }

  return qRead;
}

module.exports = {
  read,
  getRead,
};
