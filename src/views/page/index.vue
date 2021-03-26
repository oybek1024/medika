<template>
  <div>
    <header>
      <div class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-3 p-0">
              <div class="logo_brand">
                <div class="logo_top">
                  <p>vos meilleures</p>
                </div>
                <div class="logo_bottom" style="display: flex">
                  <span>E</span>
                  <span>C</span>
                  <span><img :src="require('./assets/img/pig.svg.png')" alt="pic_logo"></span>
                  <span>N</span>
                  <span>O</span>
                  <span>M</span>
                  <span>I</span>
                  <span>E</span>
                  <span>S</span>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row ">
                <div class="col-12 ">
                  <div class="menu mr-4 mt-4">
                    <ul class="menu_list">
                      <li class="menu_list_item">
                        <a href="#">Mon Guide</a>
                      </li>
                      <li>
                        <a href="#">F.A.Q</a>
                      </li>
                      <li>
                        <a href="#" class="sing_in_button">
                          J'en profite
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="accaunt">
          <div class="row">
            <div class="col-3 p-0 mt-3">
              <img :src="require('./assets/img/man.png')" alt="accaunt_img">
            </div>
            <div class="col-9 p-0">
              <div class="phone_add pt-2 d-flex">
                <img  :src="require('./assets/img/contact.png')" alt="phone_img">
                <div class="phone_contex">
                  <p>APPEL GRATUIT</p>
                  <p>0810 550 560</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="row">
          <div class="heading_wrap">
            <h1 class="heading_contex">Je choisis mes domaines d'economies</h1>
            <p class="paragraph_contex">Un consiiller va vous accompagner.</p>
          </div>
        </div>
        <div v-for="(item, i) in items" :key="i">
          <div class="accardion_item row mb-3" v-if="!item.visible">
            <div class="col-3 accardion_img">
              <img class="accardion_logo img-fluid" :src="item.image" alt="gas_icon">
            </div>
            <div class="col-9 accardion_text">
              <p class="accardion_contex">Vos economies en Electricite</p>
              <span class="plus_icon" style="cursor: pointer" @click="item.visible = !item.visible">+</span>
            </div>
          </div>
          <transition name="slide">
            <div v-if="item.visible" class="row accardion_main mb-3">
              <div class="col-3 accardion_img">
                <img class="accardion_logo img-fluid" :src="item.image" alt="gas_icon">
              </div>
              <div class="col-9 accardion_form" :style="`background-image: url(${item.image})`">
                <div class="accardion_text">
                  <p class="accardion_contex">Vos economies en Gas</p>
                  <span class="plus_icon" @click="item.visible = !item.visible" style="cursor: pointer">&#8212;</span>
                </div>
                <form action="">
                  <div class="row">
                    <div class="col-6">
                      <label for="select">votre fournisseur actuel:</label><br>
                      <select name="select">
                        <option value="SuperGas">SuperGas</option>
                        <option value="SuperGas">SuperGas</option>
                        <option value="SuperGas">SuperGas</option>
                      </select>
                      <label for="summ">Mes depenses mensuelles:</label><br>
                      <input type="text" name="summ" placeholder="150 &euro;/ mois">
                      <label for="upload_file">J'upload mes documents:</label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">J'upload mes documents:</label>
                      </div>
                      <label>Commentaires utiles a ma demande:</label>
                      <textarea placeholder="je paye trop cher, je souhaite diminuer mes depenses..." cols="30" rows="5"></textarea>
                    </div>
                    <div class="col-6 saves">
                      <h2 class="saved_list">Ma liste de dacuments</h2>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <p>facture_supergas_10-09-2021.pdf</p>
                      <button type="submit" class="button_submit">Enregisterer</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </transition>
        </div>
        <div class="row">
          <button class="suivant">
            suivant &raquo;
          </button>
        </div>
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-3">
            <div class="logo_brand">
              <div class="logo_top">
                <p>vos meilleures</p>
              </div>
              <div class="logo_bottom" style="display: flex">
                <span>E</span>
                <span>C</span>
                <span><img style="margin: 7px 3px" :src="require('./assets/img/pig.svg.png')" alt="pic_logo"></span>
                <span>N</span>
                <span>O</span>
                <span>M</span>
                <span>I</span>
                <span>E</span>
                <span>S</span>
              </div>
            </div>
            <div class="socials d-flex align-items-center ">
              <a href="#"><img class="img-fluid mr-3" width="45" src="./assets/img/facebook.svg" alt="facebook_icon"></a>
              <a href="#"><img  class="img-fluid mr-4" width="30" src="./assets/img/you-tube.svg" alt="you-tube"></a>
              <a href="#"><img class="img-fluid" width="30" src="./assets/img/twitter.svg" alt="twitter_icon"></a>
            </div>
          </div>
          <div class="col-3">
            <h4 class="our_servises">Vos servises</h4>
            <ul class="our_servises_list">
              <li class="our_servises_list_item">A propos</li>
              <li class="our_servises_list_item">Contactez-nous</li>
              <li class="our_servises_list_item">Sulves le guide!</li>
              <li class="our_servises_list_item">votre estimation</li>
              <li class="our_servises_list_item">partager le bon plan</li>
              <li class="our_servises_list_item">FAQ</li>
            </ul>
          </div>
          <div class="col-3">
            <h4 class="our_servises">Vos servises</h4>
            <ul class="our_servises_list">
              <li class="our_servises_list_item">A propos</li>
              <li class="our_servises_list_item">Contactez-nous</li>
              <li class="our_servises_list_item">Sulves le guide!</li>
              <li class="our_servises_list_item">votre estimation</li>
              <li class="our_servises_list_item">partager le bon plan</li>
              <li class="our_servises_list_item">FAQ</li>
            </ul>
          </div>
          <div class="col-3">
            <h4 class="our_servises">Vos servises</h4>
            <ul class="our_servises_list">
              <li class="our_servises_list_item">A propos</li>
              <li class="our_servises_list_item">Contactez-nous</li>
              <li class="our_servises_list_item">Sulves le guide!</li>
              <li class="our_servises_list_item">votre estimation</li>
              <li class="our_servises_list_item">partager le bon plan</li>
              <li class="our_servises_list_item">FAQ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
<!--    &lt;!&ndash;    HEADER&ndash;&gt;-->
<!--    <div class="header">-->
<!--      <div class="menu__main">-->
<!--        <div class="title">-->
<!--          Voceus-->
<!--          <br>-->
<!--          Econimic-->
<!--        </div>-->
<!--        <div class="menu">menu</div>-->
<!--      </div>-->
<!--      <div class="login_btn">login</div>-->
<!--      <div class="info_btn">info</div>-->
<!--    </div>-->

<!--    &lt;!&ndash;    HEADER&ndash;&gt;-->

<!--    &lt;!&ndash;    CONTENT&ndash;&gt;-->
<!--    <div class="main_content">-->
<!--      main content-->
<!--    </div>-->
<!--    &lt;!&ndash;    CONTENT&ndash;&gt;-->

<!--    &lt;!&ndash;    COLLAPSE&ndash;&gt;-->
<!--    <div class="collapse">-->
<!--      main collapse-->
<!--      <div class="collapse_header"> collapse header</div>-->
<!--      <div class="collapse_content">collapse content</div>-->
<!--    </div>-->
<!--    &lt;!&ndash;    COLLAPSE&ndash;&gt;-->

<!--    &lt;!&ndash;    FOOTER&ndash;&gt;-->
<!--    <div class="footer">footer</div>-->
<!--    &lt;!&ndash;    FOOTER&ndash;&gt;-->
  </div>

</template>

<script>
import './assets/css/main.css'
export default {
  data () {
    return {
      visible: false,
      items: [
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/electr.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/gaz-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/home-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/car-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/internet-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/mobile-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/mutuelle-icon.png')
        },
        {
          visible: false,
          text: 'Vos economies en Electricite',
          image: require('./assets/img/bank-icon.png')
        }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  cursor: pointer;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 300px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
