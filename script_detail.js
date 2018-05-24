	'use strict'
  var URL = window.URL || window.webkitURL
  
  function srt2vtt(srt) {
		var vtt = ''
	 	srt = srt.replace(/\r+/g, '');
	  	var list = srt.split('\n');
	  	for (var i = 0; i < list.length; i++) {
	  		var m = list[i].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/)
	  		if (m) {
	  			vtt += m[1]+':'+m[2]+':'+m[3]+'.'+m[4]+' --> '+m[5]+':'+m[6]+':'+m[7]+'.'+m[8]+'\n';
	  		} else {
	  			vtt += list[i] + '\n'
	  		}
	    }
	    vtt = "WEBVTT\n\n\n" + vtt
	    vtt = vtt.replace(/^\s+|\s+$/g, '');
	    return vtt
	}

  // attachFile
  function attachFile() {
	var target = this.getAttribute('target')
    var file = this.files[0]
	console.log(file)
	var reader = new FileReader();
	reader.onload = function(progressEvent){
		var contents = this.result
		var string = srt2vtt(contents)
		var vttBlob = new Blob([string], {type: 'text/plain'});
		var fileURL = URL.createObjectURL(vttBlob)
		var targetNode = document.querySelector(`${target}`)
		targetNode.src = fileURL
	};
	
	if(file.name.split('.').pop() =='srt'){
		reader.readAsText(file)
	} else {
		var fileURL = URL.createObjectURL(file)
		var targetNode = document.querySelector(`${target}`)
		targetNode.src = fileURL
	}
	
	if (target.includes('track')){
		showAll()
		}
  }
  
  
  // default SRT
  function attachSrt(fileLoc,target){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		console.log('test')
		var string = srt2vtt(xhr.responseText)
		var vttBlob = new Blob([string], {type: 'text/plain'});
		var fileURL = URL.createObjectURL(vttBlob)
		var targetNode = document.querySelector(`${target}`)
		targetNode.src = fileURL
	}

	xhr.open("GET",fileLoc);
	xhr.send();
	showAll()
  }

  
  function showAll(){
   for (var i = 0; i < videoNode.textTracks.length; i++) {
      videoNode.textTracks[i].mode = 'showing';
   }
  }
  
  
  
  var videoNode = document.querySelector('video')
  var inputNode = document.querySelectorAll('[target]')
  var showAllButton = document.querySelector('#show-all')

  //var qs = new Querystring();
  //var index = qs.get("idx");
  var index = 4;
  console.log(index)
  fetch('episodelist.json')
	.then(function(response) {
	return response.json();
	})
	.then(function(myJson) {
		var episode = myJson.episodes;
		console.log(episode[index])
		var output = '<source src="'+episode[index].mp3Url+'">';
		//document.getElementById('mp3source').innerHTML = output;
		document.getElementById('title').innerHTML = episode[index].title;
	    videoNode.src = episode[index].mp3Url;
		attachSrt(episode[index].srtE,'#track1') 
		attachSrt(episode[index].srtK,'#track2')
	});
	

  
  
  
  inputNode.forEach(inputNode=>inputNode.addEventListener('change', attachFile, false))
  showAllButton.addEventListener('click', showAll);
  
 

