<template>
  <b-card class="container">
    <b-card-header>Game: {{ game.title }}</b-card-header>
    <b-card-text>
      Rating:
      <b-form-rating
        size="lg"
        no-border
        show-clear
        class="rating"
        id="rating-inline-center"
        inline
        disabled
        v-bind:value="rating.ratingValue"
        color="orange"
      ></b-form-rating>
    </b-card-text>
    <b-card-text
      >Date:
      {{
        new Date(rating.ratingDateTime).toLocaleString("en", options)
      }}</b-card-text
    >
    <button
      class="btn btn-danger"
      v-b-modal="`${game.title}`"
      v-bind:key="game.id"
    >
      Delete <b-icon icon="trash" />
    </button>
    <b-modal
      ok-variant="danger"
      ok-title="DELETE"
      cancel-title="CANCEL"
      @ok="deleteRating"
      v-bind:id="game.title"
    >
      Are you sure you want to delete {{ game.title }}?
    </b-modal>
  </b-card>
</template>

<script>
import GameService from "../services/GameService";
import RatingService from "../services/RatingService";

export default {
  props: ["rating"],
  data() {
    return {
      game: {},
      options: { year: "numeric", month: "long", day: "numeric" },
    };
  },
  methods: {
    getGame() {
      GameService.getGame(this.rating.gameId).then((response) => {
        this.game = response.data;
      });
    },
    deleteRating() {
      RatingService.deleteRating(this.rating.gameId, this.rating.userId).then(
        () => location.reload()
      );
    },
  },
  created() {
    this.getGame();
  },
};
</script>

<style>
</style>