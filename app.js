function getArticles(){
	year = $('#year').val();
	month = $('#month').val();
	topicSelection = $('#topic').val();
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
	  	var ul = document.getElementById("output-list")
	  	while (ul.hasChildNodes()) {
    		ul.removeChild(ul.lastChild);
		}
	  	for(doc of data["response"]["docs"]){
	  		//console.log(JSON.stringify(doc));
	  		var li = document.createElement("li");
	  		var link = document.createElement("a");
	  		//the topic is the item in the web url after the 6th slash
	  		var topic = JSON.stringify(doc["web_url"]).split("/")[6]
	  		if (topic == topicSelection){
	  			link.href = doc["web_url"];
		  		link.value = topic+JSON.stringify(doc["headline"]["main"]);
		  		link.target = "_blank"
		  		//append headline to li
		  		li.appendChild(document.createTextNode(JSON.stringify(doc["headline"]["main"]).replace('"','').replace('"','')));
		  		//append li to link
		  		link.appendChild(li)
		  		ul.appendChild(link)
	  		}
	  	}
	  	//sortList(ul);
	  })
	  .catch(function(error) {
	    console.log(`Error: ${error.message}`);
	  });
}
