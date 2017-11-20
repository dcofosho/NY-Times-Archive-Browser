function getArticles(){
	year = $('#year').val();
	month = $('#month').val();
	console.log(`year: ${year}, month: ${month}`)
	var url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
	url += '?' + $.param({
	  'api-key': "a82c8a555ee9494fa331aa759b3f1f1b"
	});
	fetch(url)
	  .then(response => {
	    if (response.ok) {
	      return Promise.resolve(response);
	    }
	    else {
	      return Promise.reject(new Error('Failed to load')); 
	    }
	  })
	  .then(response => response.json()) // parse response as JSON
	  .then(data => {
	  	var ol = document.getElementById("output-list")
	  	while (ol.hasChildNodes()) {
    		ol.removeChild(ol.lastChild);
		}
	  	for(doc of data["response"]["docs"]){
	  		console.log(JSON.stringify(doc));
	  		var li = document.createElement("li");
	  		var link = document.createElement("a");
	  		link.href = doc["web_url"];
	  		link.value = JSON.stringify(doc["headline"]["main"]);
	  		link.target = "_blank"
	  		li.appendChild(document.createTextNode(JSON.stringify(doc["headline"]["main"])));
	  		link.appendChild(li)
	  		ol.appendChild(link)
	  	} 
	    //document.getElementById("output").innerHTML = (`Data: ${JSON.stringify(data["response"]["docs"])}`)
	  })
	  .catch(function(error) {
	    console.log(`Error: ${error.message}`);
	  });
}
//getArticles();
