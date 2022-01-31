<template>
	<div class="ssl-generator">
		<div class="container">
			<div v-if="result.result == 'pending'" class="generator__wrapper">
				<h2>CSR generator</h2>

				<form action="#" class="generator__form">
					<a-row>
						<a-col>{{$t('Domain:')}}*</a-col>
						<a-col>
							<a-input v-model="options.csr_commonname" placeholder="example.com"></a-input>
						</a-col>
					</a-row>

					<a-row>
						<a-col>{{$t('Organization:')}}*</a-col>
						<a-col>
							<a-input v-model="options.csr_organization" placeholder="Mycompany"></a-input>
						</a-col>
					</a-row>

					<a-row>
						<a-col>{{$t('Departament:')}}*</a-col>
						<a-col>
							<a-input v-model="options.csr_department"  placeholder="IT"></a-input>
						</a-col>
					</a-row>

					<a-row>
						<a-col>{{$t('City:')}}*</a-col>
						<a-col>
							<a-input v-model="options.csr_city" placeholder="Minsk"></a-input>
						</a-col>
					</a-row>

					<a-row>
						<a-col>{{$t('State:')}}*</a-col>
						<a-col>
							<a-input v-model="options.csr_state" placeholder="Minsk"></a-input>
						</a-col>
					</a-row>

					<a-row>
						<a-col>{{$t('Country:')}}*</a-col>
						<a-col>
							<a-select
								style="width: 100%"
								v-model="options.csr_country"
								show-search
							>
								<a-select-option v-for="country in Object.keys(countries)" :key="country" :value="country">
									{{country}}: {{countries[country]}}
								</a-select-option>
							</a-select>
						</a-col>
					</a-row>

					<a-row>
						<a-col>Email:*</a-col>
						<a-col>
							<a-input v-model="options.csr_email" placeholder="admin@example.com"></a-input>
						</a-col>
					</a-row>

					<a-row class="generator__submit">
						<a-col>
							<a-button type="primary" @click="generateCSR">Generate CSR</a-button>
						</a-col>
					</a-row>
				</form>
			</div>
			<div v-else-if="result.result == 'success'" class="generator__wrapper generator__wrapper--done">
				<a-row type="flex" justify="space-between">
					<a-col>
						<h2>CSR code and key</h2>
					</a-col>

					<a-col>
						<div class="button--icon" @click="retry">
							<a-icon type="redo" />
						</div>
					</a-col>
				</a-row>

				<div class="generator__result">
					<a-row>
						<a-col>CSR code</a-col>
						<a-col>
							<a-textarea 
								:value="result.csr_code"
								:auto-size="{ minRows: 10, maxRows: 10 }"
							/>
						</a-col>
					</a-row>

					<a-row>
						<a-col>CSR key</a-col>
						<a-col>
							<a-textarea 
								:value="result.csr_key"
								:auto-size="{ minRows: 10, maxRows: 10 }"
							/>
						</a-col>
					</a-row>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";
const countries = {"BY":"Беларусь","RU":"Россия","UA":"Украина","AD":"Андорра","AE":"ОАЭ","AF":"Афганистан","AG":"Антигуа и Барбуда","AI":"Ангилья","AL":"Албания","AM":"Армения","AO":"Ангола","AQ":"Антарктика","AR":"Аргентина","AS":"Американское Самоа","AT":"Австрия","AU":"Австралия","AW":"Аруба","AX":"Аландские острова","AZ":"Азербайджан","BA":"Босния и Герцеговина","BB":"Барбадос","BD":"Бангладеш","BE":"Бельгия","BF":"Буркина-Фасо","BG":"Болгария","BH":"Бахрейн","BI":"Бурунди","BJ":"Бенин","BL":"Сен-Бартелеми (Карибы)","BM":"Бермуды","BN":"Бруней","BO":"Боливия","BQ":"Бонэйр, Синт-Эстатиус и Саба","BR":"Бразилия","BS":"Багамские Острова","BT":"Бутан","BV":"Остров Буве","BW":"Ботсвана","BZ":"Белиз","CA":"Канада","CC":"Кокосовые острова","CD":"ДР Конго","CF":"ЦАР","CG":"Республика Конго","CH":"Швейцария","CI":"Кот-д’Ивуар","CK":"Острова Кука","CL":"Чили","CM":"Камерун","CN":"Китай","CO":"Колумбия","CR":"Коста-Рика","CU":"Куба","CV":"Кабо-Верде","CW":"Кюрасао","CX":"Остров Рождества","CY":"Кипр","CZ":"Чехия","DE":"Германия","DJ":"Джибути","DK":"Дания","DM":"Доминика","DO":"Доминиканская Республика","DZ":"Алжир","EC":"Эквадор","EE":"Эстония","EG":"Египет","EH":"САДР","ER":"Эритрея","ES":"Испания","ET":"Эфиопия","EU":"Европейский союз","FI":"Финляндия","FJ":"Фиджи","FK":"Фолклендские острова","FM":"Микронезия","FO":"Фарерские острова","FR":"Франция","GA":"Габон","GB":"Великобритания","GD":"Гренада","GE":"Грузия","GF":"Гвиана","GG":"Гернси","GH":"Гана","GI":"Гибралтар","GL":"Гренландия","GM":"Гамбия","GN":"Гвинея","GP":"Гваделупа","GQ":"Экваториальная Гвинея","GR":"Греция","GS":"Южная Георгия и Южные Сандвичевы Острова","GT":"Гватемала","GU":"Гуам","GW":"Гвинея-Бисау","GY":"Гайана","HK":"Гонконг","HM":"Херд и Макдональд","HN":"Гондурас","HR":"Хорватия","HT":"Гаити","HU":"Венгрия","ID":"Индонезия","IE":"Ирландия","IL":"Израиль","IM":"Остров Мэн","IN":"Индия","IO":"Британская территория в Индийском океане","IQ":"Ирак","IR":"Иран","IS":"Исландия","IT":"Италия","JE":"Джерси","JM":"Ямайка","JO":"Иордания","KE":"Кения","KG":"Киргизия","KH":"Камбоджа","KI":"Кирибати","KM":"Коморы","KN":"Сент-Китс и Невис","KP":"КНДР","KR":"Республика Корея","KW":"Кувейт","KY":"Острова Кайман","KZ":"Казахстан","LA":"Лаос","LB":"Ливан","LC":"Сент-Люсия","LI":"Лихтенштейн","LK":"Шри-Ланка","LR":"Либерия","LS":"Лесото","LT":"Литва","LU":"Люксембург","LV":"Латвия","LY":"Ливия","MA":"Марокко","MC":"Монако","MD":"Молдавия","ME":"Черногория","MF":"Сен-Мартен","MG":"Мадагаскар","MH":"Маршалловы Острова","MK":"Северная Македония","ML":"Мали","MM":"Мьянма","MN":"Монголия","MO":"Макао","MP":"Северные Марианские Острова","MQ":"Мартиника","MR":"Мавритания","MS":"Монтсеррат","MT":"Мальта","MU":"Маврикий","MV":"Мальдивы","MW":"Малави","MX":"Мексика","MY":"Малайзия","MZ":"Мозамбик","NA":"Намибия","NC":"Новая Каледония","NE":"Нигер","NF":"Остров Норфолк","NG":"Нигерия","NI":"Никарагуа","NL":"Нидерланды","NO":"Норвегия","NP":"Непал","NR":"Науру","NU":"Ниуэ","NZ":"Новая Зеландия","OM":"Оман","PA":"Панама","PE":"Перу","PF":"Французская Полинезия","PG":"Папуа — Новая Гвинея","PH":"Филиппины","PK":"Пакистан","PL":"Польша","PM":"Сен-Пьер и Микелон","PN":"Острова Питкэрн","PR":"Пуэрто-Рико","PS":"Государство Палестина","PT":"Португалия","PW":"Палау","PY":"Парагвай","QA":"Катар","RE":"Реюньон","RO":"Румыния","RS":"Сербия","RW":"Руанда","SA":"Саудовская Аравия","SB":"Соломоновы Острова","SC":"Сейшельские Острова","SD":"Судан","SE":"Швеция","SG":"Сингапур","SH":"Острова Святой Елены, Вознесения и Тристан-да-Кунья","SI":"Словения","SJ":"Шпицберген и Ян-Майен","SK":"Словакия","SL":"Сьерра-Леоне","SM":"Сан-Марино","SN":"Сенегал","SO":"Сомали","SR":"Суринам","SS":"Южный Судан","ST":"Сан-Томе и Принсипи","SV":"Сальвадор","SX":"Синт-Мартен","SY":"Сирия","SZ":"Эсватини","TC":"Теркс и Кайкос","TD":"Чад","TF":"Французские Южные и Антарктические территории","TG":"Того","TH":"Таиланд","TJ":"Таджикистан","TK":"Токелау","TL":"Восточный Тимор","TM":"Туркмения","TN":"Тунис","TO":"Тонга","TR":"Турция","TT":"Тринидад и Тобаго","TV":"Тувалу","TW":"Китайская Республика (Тайвань)","TZ":"Танзания","UG":"Уганда","UM":"Внешние малые острова США","US":"США","UY":"Уругвай","UZ":"Узбекистан","VA":"Ватикан","VC":"Сент-Винсент и Гренадины","VE":"Венесуэла","VG":"Виргинские Острова (Великобритания)","VI":"Виргинские Острова (США)","VN":"Вьетнам","VU":"Вануату","WF":"Уоллис и Футуна","WS":"Самоа","YE":"Йемен","YT":"Майотта","ZA":"ЮАР","ZM":"Замбия","ZW":"Зимбабве"};

export default {
	name: 'ssl-generator',
	data(){
		return {
			countries,
			loading: false,
			options: {
				csr_commonname: '',
				csr_organization: '',
				csr_department: '',
				csr_city: '',
				csr_state: '',
				csr_country: 'BY',
				csr_email: '',
			},
			result: {
				csr_code: '',
				csr_key: '',
				result: 'pending'
				// result: 'success'
			}
		}
	},
	methods: {
		generateCSR(){
			this.loading = true;
			api.sendAsUser('moduleTouch', {...this.options, ...{path: 'goget/generateCSR'}}, 'moduleTouchgoget')
			.then(resp => {
				// console.log(resp)
				if(resp.error){
					throw resp
				}

				this.result.result = 'success';
				this.result.csr_code = resp.csr_code;
				this.result.csr_key = resp.csr_key;
			})
			.catch(err => {
				console.error(err)
				this.$message.error(err.message);
				this.result.result = 'failed';
			})
			.finally(() => this.loading = false);
		},
		retry(){
			this.result.csr_code = '';
			this.result.csr_key = '';
			this.result.result = 'pending';
		}
	}
}
</script>

<style>

.ssl-generator{
	padding-top: 20px;
}

.generator__wrapper{
	background-color: #fff;
	border-radius: 20px;
	padding: 15px;
}

.generator__submit{
	margin-top: 20px;
}

.button--icon{
	font-size: 1.3rem;
	cursor: pointer;
	padding: 6px;
	border-radius: 50%;
	width: 43px;
	height: 43px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: color .3s ease, background-color .4s ease;
}

.button--icon:hover{
	/* color: var(--main); */
	background-color: var(--main);
	color: #fff;
}

</style>