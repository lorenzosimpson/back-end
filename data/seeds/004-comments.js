
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {'user_id': 1, trip_id: 1, commenter_name: 'jane_doe', comment: 'Nice trip, Bob!'},
        {'user_id': 2, trip_id: 2, commenter_name: 'jane_doe', comment: 'Nice trip, John!'},
      ]);
    });
};
