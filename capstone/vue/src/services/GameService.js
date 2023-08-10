import axios from "axios";

export default {
  listGames() {
    return axios.get("/game");
  },

  getGame(id) {
    return axios.get(`/game/${id}`);
  },

  addGame(newGame) {
    console.log(newGame)
    return axios.post("/game", newGame);
  },
  editGame(game) {
    console.log(game)
   return axios.put(`/game/${game.id}`, game)
  },
  deleteGame(id) {
    return axios.delete(`/game/${id}`)
  },

};
 