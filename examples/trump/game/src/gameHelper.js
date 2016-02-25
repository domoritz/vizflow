var gameHelper = {
	setup_word: function game_helper_setup_word (viz, wordConfig) {
	 
	  var wordList = [
	    // first half
	    'gonna win',
	    'best ever',
	    'the blacks',
	    'mexicans',
	    'muslims',
	    // second half
	    'the poll',
	    'got schlonged',
	    'build a wall',
	    'it\'s amazing',
	    'take his coat',
	    'love me',
	    'winning',
	  ] ;

	  var wordImage = new Array(wordList.length) ;

	  for ( var kWord = 0 ; kWord < wordList.length ; kWord++ ) {

	    wordImage[kWord] = imageHelper.word_block ({text: wordList[kWord]}) ;
	    wordImage[kWord].sourceCollisionImage = wordImage[kWord] ;
	    wordImage[kWord] = imageHelper.adjust_ratio(wordImage[kWord]) ;

	  }

	  // var wordImage = imageHelper.word (wordList[(document.skipIndex * (document.skipIndex - 1)) % wordList.length]) ;
	  var maxNword  = 6 ;
	  var wordPause = maxNword * 100 ;
	  var skip      = 17 ;

	  function word_transition(xNew, word) {

	    if(word === undefined) {
	      word = this ;
	    }

	    //console.log('word transition start') ;

	    // this.image = imageHelper.word(wordList[(document.skipIndex * (document.skipIndex + 3)) % wordList.length]) ;
	    word.image = wordImage[$Z.iter % wordList.length] ;

	    // imageHelper.view(word.image)

	    // console.log('word_transition', 'word', word) ;

	    xNew       = -word.image.width ;

	    var yMove  = 10 ;
	    word.y    -= yMove ;
	    var yNew   = word.y + yMove ;

	    var down   = $Z.transition.rounded_linear_transition_func('y', viz.dur * 15 )(yNew) ;

	    down.pause = 300 ;
	    
	    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 80 )(xNew) ; // sets speed of word block    

	    left.end   = bulletHelper.default_end(viz, word, viz.player) ;
	    // console.log('word transition end') ;

	    down.child = left ;

	    this.transition = [down] ;

	    this.fade() ;

	    //var down   = $Z.transition.rounded_linear_transition_func( 'y', viz.dur * 30 )(viz.player.config.y - wordImage.height * wordCount) ;
	    //down.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
	    //left.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
	    //var word = word ;
	    //left.child.end = function() {
	    // console.log('word down end: start', 'wordCount', wordCount)
	    //  bulletHelper.default_end(viz, word, viz.player).run() ;
	    // console.log('word down end: end')
	    ///} ;
	    // console.log('word transition', 'left', left) ;
	    //left.child = down ;

	  }

	  var word = {

	    viz: viz, 
	    config: wordConfig,
	    image: wordImage[0],
	    transition: word_transition,
	    render: drawHelper.image,
	    type: 'enemy',
	    collision_image: actionHelper.collision_image,
	    singleSwitch: true,
	    opacity: 0,
	    inert: false,
	    responseSet: {},
	    explode: imageEffectHelper.explode,
	    fade: imageEffectHelper.fade,
	    fadeDuration: 200,

	  } ;

	  return word ;
	  
	},	
} ;