<template>
  <div>
    <el-card class="card" shadow="hover">
      <div class="carousel-container">
        <el-carousel height="600px" :interval="30000" arrow="always">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <div class="carousel-image-wrapper">
              <img :src="image" alt="carousel-image" class="carousel-image" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/5.jpg";

export default {
  data() {
    return {
      images: [image1, image2, image3,image4,image5, image6]
    };
  }
};
</script>

<style>
.carousel-container {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.carousel-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px; /* You can adjust this height to suit your design */
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>

