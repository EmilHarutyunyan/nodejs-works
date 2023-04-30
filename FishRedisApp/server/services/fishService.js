import axios from "axios";
import { API_ENDPOINT } from "../configs/configs.js";
import { messageFish } from "../constants/constants.js";

const getFishLists = async () => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}`)
    
    return data.map((item) => {
      return item['Path'].split('/').at(-1)
    })
  } catch (error) {
    throw error
  }
}
const getFishSpecies = async (species) => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}${species}`)
    if (!data.length) {
      throw messageFish.notFish
    }
    return data
  } catch (error) {
    throw error
  }
}

const fishService = { getFishLists, getFishSpecies }
export default fishService