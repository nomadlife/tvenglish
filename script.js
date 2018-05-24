
const inputs = document.querySelectorAll('.controls input');
//console.log(inputs,"test1:inputs");

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  //console.log(this.value, suffix,"test2:suffix");
  document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
  //console.log(this.name);
}

fetch('episodelist.json')
	.then(function(response) {
	return response.json();
	})
	.then(function(myJson) {
	var episode = myJson.episodes;
	   var output = '';
		for(var i=0;i<episode.length;i++){
			output += 
			'<div class="thumbnail"><a href="detail.html?idx='+i+'"><img src="' + episode[i].image + '"><div class="caption"><h2>'+ episode[i].title +'</h2></div></a></div>';
			}
		document.getElementById('episodes').innerHTML = output;
	});

inputs.forEach(input => input.addEventListener('change',handleUpdate))
inputs.forEach(input => input.addEventListener('mousemove',handleUpdate))
