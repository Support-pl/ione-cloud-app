<template>
  <div id="app">
    <a-spin tip="Any Loading..." :spinning="spinning">
      <a-layout>
        <!-- <a-layout-header>Header</a-layout-header> -->
        <a-layout-content>
          <div class="card-container">
            <a-tabs defaultActiveKey="1" :tabBarStyle="{}" type="card">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="home" theme="filled" />App
                </span>
                <p>Content of Tab Pane 1</p>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="setting" theme="filled" />
                  {{$t('Settings')}}
                </span>
                <p>Content of Tab Pane 2</p>
              </a-tab-pane>
              <a-tab-pane key="3" disabled>
                <a id="buy-license__link" slot="tab" target="_blank" href="https://my.support.pl">
                  <span>
                    <a-icon type="shopping-cart" />
                    {{$t('Buy a license')}}
                  </span>
                </a>
                <!-- <p>Content of Tab Pane 3</p> -->
              </a-tab-pane>

              <div id="labelinfo" slot="tabBarExtraContent">
                <img src="./assets/light.png" />
                <span>
                  <a
                    target="_blank"
                    href="https://bitrix24public.com/cloud.bitrix24.pl/form/85_bank_idey/rqpzor/"
                  >{{$t('Have an idea to make the app better')}}</a>
                </span>
              </div>
            </a-tabs>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <div id="footer">
            <div id="footerone">
              <div>
                <a href="https://my.support.pl/cart.php?gid=4&subg=all" target="_blank">
                  <a-icon type="shopping" theme="filled" />
                  &nbsp;{{$t('Application Catalog')}}
                </a>
              </div>
              <div>
                <a
                  href="https://my.support.pl/index.php?rp=/knowledgebase/5/Produkty-i-Usugi"
                  target="_blank"
                >
                  <a-icon type="folder" theme="filled" />
                  &nbsp;{{$t('Knowledge Base')}}
                </a>
              </div>
              <div>
                <a href="https://cloud.bitrix24.pl/online/apps-help" target="_blank">
                  <a-icon type="message" theme="filled" />
                  &nbsp;{{$t('Online-chat')}}
                </a>
              </div>
              <div>
                <a
                  href="https://bitrix24public.com/cloud.bitrix24.pl/form/83_ostavit_otzyv_o_prilozhenii/4uha5i/"
                  target="_blank"
                >
                  <a-icon type="code" theme="filled" />
                  &nbsp;{{$t('Order an app development')}}
                </a>
              </div>
            </div>
            <div class="anyfooter">
              <span>
                <a-icon type="tool" theme="filled" />
                &nbsp;{{$t('Need more functionality on these app? Write us!')}}
              </span>
              <a href="mailto:bitrix24@support.pl">&nbsp;bitrix24@support.pl</a>
            </div>
            <div class="anyfooter">
              <span>{{$t('Developed by')}}</span>
              <a href="https://support.pl" target="_blank">&nbsp;SUPPORT.PL</a>
            </div>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinning: true
    };
  },
  mounted() {
    setTimeout(() => (this.spinning = false), 3000);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* body {
  background-color: #0083dc !important;
} */

#app .ant-layout-header,
#app .ant-layout-footer {
  padding-top: 0;
  background-color: #0083dc;
  color: #fff;
}
#app .ant-layout-footer {
  line-height: 1.5;
}
#app .ant-layout-sider {
  background: #0083dc;
  color: #fff;
}
#app .ant-layout-content {
  background: #0083dc;
  color: #fff;
}

#labelinfo {
  display: flex;
  align-items: center;
  font-size: 12px;
}

#labelinfo > img {
  width: 20px;
}

#labelinfo > span > a {
  text-decoration: none;
  color: white;
}

#labelinfo > span > a:hover {
  letter-spacing: 0.1px;
}
#buy-license__link {
  text-decoration: none;
  color: white;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab:nth-child(3) {
  background: rgb(0, 217, 106) !important;
  border-color: rgb(50, 175, 85) !important;
  cursor: pointer;
}

.card-container {
  background-color: #0083dc;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border: none;
}

.card-container > .ant-tabs-card,
.card-container > .ant-tabs-card > .ant-tabs-content,
.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  border-radius: 0 7px 7px 7px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-top-right-radius: 7px !important;
  border-top-left-radius: 7px !important;
}

.card-container
  > .ant-tabs-card
  > .ant-tabs-bar
  .ant-tabs-tab:not(.ant-tabs-tab-active) {
  color: white;
  background: #006fb4;
  border-color: #00a5db;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

#footer {
  padding: 0px;
  margin: 0px;
  width: 100%;
  text-align: center;
}

#footerone {
  display: flex;
  padding: 0px;
  margin-top: 19px;
  width: 100%;
  justify-content: center;
}

#footerone > div {
  color: white;
  margin-right: 4%;
  cursor: pointer;
}

#footerone > div > a {
  text-decoration: none;
  color: white;
}

#footerone > div :hover {
  letter-spacing: 0.2px;
  color: orange;
}

.anyfooter {
  margin-top: 10px;
}

.anyfooter > span {
  color: white;
  font-size: 12px;
}

.anyfooter > a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.anyfooter > a:hover {
  letter-spacing: 0.1px;
  color: orange;
}
</style>
