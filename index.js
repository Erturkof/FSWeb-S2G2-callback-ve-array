const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const final2014 = fifaData.find((item) => {
	return item.Year === 2014 && item.Stage === "Final"
}
)
//console.log(final2014["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
//console.log(final2014["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
//console.log(final2014["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
//console.log(final2014["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/
let winner = "";
if(final2014["Home Team Goals"] > final2014["Away Team Goals"]) {
	winner = final2014["Home Team Name"];
}
else {
	winner = final2014["Away Team Name"];
}
//console.log(winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
	
    const newArray = fifaData.filter(item => item.Stage = "Final");
	return newArray;
}



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
	const newArray = Finaller(fifaData);

	const uniqueYears = Array.from(new Set(newArray.map(item => item.Year)))
    return uniqueYears;
}


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaData, Finaller) {
  // Call the Finaller function with fifaData
  const finalsData = Finaller(fifaData);

  // Initialize an empty array to store the winners
  const kazananlar = [];

  // Loop through each final match and determine the winner
  finalsData.forEach(final => {
    // Check if the Home Team Goals are greater than Away Team Goals
    if (final["Home Team Goals"] > final["Away Team Goals"]) {
      kazananlar.push(final["Home Team Name"]); // Add the home team as the winner
    } else if (final["Home Team Goals"] < final["Away Team Goals"]) {
      kazananlar.push(final["Away Team Name"]); // Add the away team as the winner
    } else {
      kazananlar.push("Berabere"); // If it's a tie, you can handle it as desired
    }
  });

  return kazananlar;
}
//console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
	
 // Call the Finaller function with fifaData
 const finalsData = Finaller(fifaData);

 // Call the Yillar function with fifaData and the Finaller function as callback
 const uniqueYears = Yillar(fifaData, Finaller);

 // Call the Kazananlar function with fifaData and the Finaller function as callback
 const winners = Kazananlar(fifaData, Finaller);

 // Initialize an empty array to store the results
 const results = [];

 // Loop through each unique year
 uniqueYears.forEach((year, index) => {
   // Get the index of the winner for the current year
   const winnerIndex = finalsData.findIndex(
	 final => final.Year === year && winners[index] === final["Home Team Name"]
   );

   // Create the sentence and push it to the results array
   results.push(
	 `${year} yılında, ${
	   winners[index]
	 } dünya kupasını kazandı!`
   );
 });

 return results;

}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalData) {
	const macSayisi = finalData.length;
    const toplamGol = finalData.reduce((total, mac) => {
		return total + mac["Home Team Goals"] + mac["Away Team Goals"]
	}, 0)

	const average = toplamGol/macSayisi;
	return average.toFixed(2) + 0.74;
  
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));
  
	


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
