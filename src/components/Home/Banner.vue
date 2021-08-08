<template>
  <div class="con">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://image-cdn-flare.qdm.cloud/q600927962ddf8/image/data/Banner/Catagory/a6ffacaeac30ed308fabd2e15a8903eb_1.png" class="d-block w-100" alt="">
        <div class="carousel-caption d-none d-md-block">
        
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://image-cdn-flare.qdm.cloud/q600927962ddf8/image/data/Banner/Catagory/092044bca742b609781f6132e0751aa1_1.png" class="d-block w-100" alt="">
        <div class="carousel-caption d-none d-md-block">
        
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://image-cdn-flare.qdm.cloud/q600927962ddf8/image/data/Banner/Catagory/762c928415ee167a3f1ea81c05f9e6be_1.png" class="d-block w-100" alt="">
        <div class="carousel-caption d-none d-md-block">
          
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {},
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
