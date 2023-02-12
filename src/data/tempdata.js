import initialData from './initialdata'

const tempStorage = window.localStorage
const tempStorageKey = 'temp-data'

function tempReadData() {
  // read data or use initial defaults if not yet saved
  const data = JSON.parse(tempStorage.getItem(tempStorageKey))
  return data ?? initialData
}

function tempSaveData(data) {
  tempStorage.setItem(tempStorageKey, JSON.stringify(data))
}

function getPlace(placeId) {
  const data = tempReadData()
  return Promise.resolve(data.places[placeId].info)
}

function getReviews(placeId) {
  const data = tempReadData()
  return Promise.resolve(data.places[placeId].reviews)
}

function saveReview(placeId, data) {
  // TODO
  return Promise.resolve()
}

export default {
  getPlace,
  getReviews,
  saveReview,
}