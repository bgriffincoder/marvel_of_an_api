(function(){ //start of self-invoking function
  $(function(){ //start of document ready function

    //assign ID element of submit button
    let searchButton = $("#searchBtn");
    //search value from box
    let searchValue = "";
    //api credential url
    let myUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=572832eba3e680bdb05f357ee36433ed&hash=0eeeafee078ed5a7059c334bb9685317"
    //store heroes
    let characters;
    //store character images and names in an array
    let heroArray = [];

    //form new api call url
    function addQSParm(name, value) {
        var re = new RegExp("([?&]" + name + "=)[^&]+", "");

        function add(sep) {
            myUrl += sep + name + "=" + encodeURIComponent(value);
        }

        function change() {
            myUrl = myUrl.replace(re, "$1" + encodeURIComponent(value));
        }
        if (myUrl.indexOf("?") === -1) {
            add("?");
        } else {
            if (re.test(myUrl)) {
                change();
            } else {
                add("&");
            }
        }
    }

    function retrieveCharacters(myNewApiURL) {
      $.get(myNewApiURL,function(data) {
        characters = data.data.results;
        for(let i = 0;i < characters.length; i++) {
          let path = characters[i].thumbnail.path;
          let extension = characters[i].thumbnail.extension;
          let superHeroName = characters[i].name;
          let newImage = "<img src="+path+"."+extension+" width=\"350\" height=\"200\" />";
          heroArray[i] = {imgPath: newImage, heroName: superHeroName };
          $("#herocard").append("<div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-6\"><div class=\"thumbnail \">"+
          heroArray[i].imgPath+
          "<div class=\"caption\"><h3>"+
          heroArray[i].heroName
          +"</h2></div><!-- /.caption --></div><!-- /.thumbnail --></div> ");
        }
      })
    }

    retrieveCharacters(myUrl);
    
    searchButton.click(function(e){
      searchValue = $("#searchMarvel").val();
      if(searchValue == "") {
        retrieveCharacters(myUrl);
      } else {
        //stops form button from submitting data
        e.preventDefault();
        //grab input answer
        searchValue = $("#searchMarvel").val();
        //add query parameter to api credential url
        addQSParm("nameStartsWith", searchValue);
        retrieveCharacters(myUrl);
      }

    });

  });//end of document ready function
})()//end of self-invoking fuction
