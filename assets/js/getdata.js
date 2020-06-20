const total = document.querySelector(".add");
const totalcon = document.querySelector("#conf");
const active = document.querySelector("#act");
const death = document.querySelector("#dec");
const recovered = document.querySelector("#rec");

const GenerateDate = ()=>{
  
	const now = new Date();
	let year = dateFns.format(now,'YYYY');
	let month = dateFns.format(now,'MM');
	let day = dateFns.format(now,'DD');
	let date = year+"-"+month+"-"+day;
	return date;
}



const GetDataByCountry = async()=>{
  

	const date = GenerateDate();
	   const url = "https://api.covid19india.org/data.json"//"https://api.covid19api.com/country/india?from=2020-03-01T00:00:00Z&to="+date+"T00:00:00Z";
	   const response = await fetch(url);
	   const data = await response.json();
	   const len=data.statewise.length;
       
	   const last= data[len-1];
	   arr = data.statewise;

	   totalcon.innerText = data.statewise[0].confirmed;
	   active.innerText = data.statewise[0].active; 
	   death.innerText = data.statewise[0].deaths; 
	   recovered.innerText =  data.statewise[0].recovered; 
	   for(let i=1;i<len;i++)
	   {
                   if(i==10)
		   continue;
		   
		   let state = data.statewise[i].state;
		   let confirmed = data.statewise[i].confirmed;
		   let active = data.statewise[i].active;
		   let recovered = data.statewise[i].recovered;
		   let deaths = data.statewise[i].deaths;
		let html = `
					<section class="facts section-bg " data-aos="fade-up">
					<div class="container">
		            <div class="row  horizontal">
					<div  class = "col-lg-3 col-md-3 col-sm-3 col-xs-3 text state" >
					    ${state}
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-3 text confirmed"  >
					   ${confirmed}
					</div> 
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-3 text active" >
					   ${active}
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-3 text recovered" >
					   ${recovered}
					</div>
					<div class="col-lg-2 col-md-2 col-sm-2 col-xs-3 text death">
					   ${deaths}
					</div>
					</div>
					</div>
					</section>`;
		total.innerHTML+=html;

	   }

	 
};
	
GetDataByCountry();	
