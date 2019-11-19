const db = require('../data/helpers/users-helpers')
const tripDb = require('../data/helpers/trips-helpers')
const photosDb = require('../data/helpers/photos-helpers')
const router = require('express').Router()
const authenticate = require('../authentication/authenticate-middleware')
const validateTrip = require('../authentication/validate-trip')

// get array of all trips
router.get('/', async (req, res) => {
    let trips = await tripDb.findTrips()
    if (trips) {
        res.status(200).json(trips)
    } else {
        res.status(500).json({ error: 'Could not get trips' })
    }
})

//get trip by trip id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let trip = await tripDb.findTripById(id)
    trip.photos = await photosDb.findPhotosByTripId(id)
     if (trip === -1) res.status(404).json({ error: "That trip doesn't exist!"})
    else if (trip) res.status(200).json(trip)
    else res.status(500).json({ error: 'Could not get trip' })
})

// get PHOTOS of a trip by trip id 
router.get('/:id/photos', async (req, res) => {
    const  { id } = req.params;
    let tripFound = await tripDb.findTripById(id)
    if (tripFound) {
        let photos = await photosDb.findPhotosByTripId(id);
        if (photos) {
            if (photos.length) {
            res.status(200).json(photos)
            } else {
            res.status(404).json({ error: 'This trip has no photos'})
            }
        } else {
        res.status(500).json({ error: 'Could not get photos'})
    }

    } else {
        res.status(404).json({ error: 'Could not find that trip' })
    }
})

router.post('/', validateTrip, authenticate, async (req, res) => {
    const trip = req.body;
    let user = await db.findById(trip.user_id)

    if (user) {
        const success = await tripDb.addTrip(trip)
        if (success) {
            let [id] = success
            let addedTrip = await tripDb.findTripById(id)
            res.status(201).json(addedTrip)
        }
        else res.status(500).json({ error: 'Could not add trip'})
    } else {
        res.status(404).json({ error: 'That user_id does not exist' })
    }
})

router.put('/:id', authenticate, async(req, res) => {
    const {id} = req.params
    const changes = req.body;

    let toUpdate = await tripDb.findTripById(id)
    if (toUpdate) {
        let updatedTrip = await tripDb.updateTrip(id, changes)
        if (updatedTrip) {
            let tripToReturn = await tripDb.findTripById(id)
            res.status(200).json(tripToReturn)
        } 
        else res.status(500).json({ error: 'Could not update trip'})
    }
    else res.status(404).json({ error: 'That trip does not exist' })
})
// needs authenticate readded
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    // try {
        let trip = await tripDb.findTripById(id)
    if (trip !== -1) {
        // console.log(trip)
        let deleted = await tripDb.deleteTrip(id)
        // console.log(deleted)
        if (deleted === 1) res.status(200).json({ message: `Deleted trip with id ${id}`})
       else res.status(500).json({ error: 'Could not delete trip'})
    } else if (trip === -1) res.status(404).json({ error: 'That trip does not exist'})
// }
    // catch(err) { 
        res.status(500).json({ error: 'Could not delete trip'})
// }
})

module.exports = router;