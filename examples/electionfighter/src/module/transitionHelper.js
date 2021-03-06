var transitionHelper = {

  find: function transition_helper_find (property, transitionList) {
    
    if(this.transition === undefined) {
      this.transition = [] ;
    }

    if (transitionList === undefined) {
      transitionList = this.transition ; // means function was attached to an item's context
    }

    if(transitionList.length === 0) {
      return -1 ;      
    }

    var transitionIndex = -1 ;
    
    for(var ktrans = 0 ; ktrans < transitionList.length ; ktrans++) {
      if(transitionList[ktrans].varName === property) {
        transitionIndex = ktrans ;
      }
    }

    return transitionIndex ;    
  },
	
  add: function transition_helper_add (newTransition, replacementSwitch, item) {

    if(item === undefined) {
      item = this ;
    }

    // assume "this" corresponds to the item whose transition array we are modifying
    if (replacementSwitch === undefined) {
      replacementSwitch = false ;
    }

    var transitionList = item.transition ;
    if (transitionList === undefined) {
      item.transition = [] ;
      transitionList = item.transition ;
    }

    if (transitionList.constructor !== Array) {
      transitionList = [transitionList] ;
    }

    // console.log('transitionList', transitionList, 'item', item) ;
    if (newTransition.constructor !== Array) {
      newTransition = [newTransition] ;
    }

    for (kNew = 0 ; kNew < newTransition.length ; kNew ++) {
      newTransition[kNew].item = item ;
      var property = newTransition[kNew].varName ;
      var transitionIndex = transitionHelper.find(property, transitionList) ;
      if (transitionIndex === -1) { // no transition with this property found
        transitionList.push(newTransition[kNew]) ;
      } else {
        if (replacementSwitch) {
          transitionList[transitionIndex] = newTransition[kNew] ;
          // console.log('item', item, 'transitionList', transitionList, 'item transition', item.transition, 'newTransition', newTransition)
        } else {
          transitionList.push(newTransition[kNew]) ;
        }// otherwise add compound transition
      }
    }    
    
  },

  remove: function transition_helper_remove (property) {
    var transitionList = this.transition ;
    if (transitionList === undefined) {
      this.transition = [] ;
      transitionList = this.transition ;
    }    
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex === -1) {
      return ; // nothing to do
    } else {
      transitionList.splice(transitionIndex, 1) ;
    }    
  },

  add_child: function transition_helper_add_child(transition, newTransition, pause, frameIndex, item) {

    if (item === undefined) {
      item = this ;
    }

    if (pause === undefined) {
      pause = 0 ;
    }

    var trans = transition ;

    if (trans === undefined) { // would be nice to add this transition to the item 

      if(item !== undefined) {
        transitionHelper.add.call(item, newTransition) ;
      }
      return ;
  
    }

    if (frameIndex === undefined) {

      frameIndex = 0 ;
      while (trans.child !== undefined) { // use last frame by default
        frameIndex++ ;
        trans = trans.child ;
      }

    } else { 

      var trans = transition ;
      for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
        trans = trans.child ;
      }

    }

    trans.pause = pause ;
    trans.child = newTransition ; // only restore UI functionality after the minimum number of frames has been rendered  
    // console.log('transition helper add child end', 'transition index', transitionIndex, 'new transition', newTransition, 'transition', transition) ;
     
  },  

  add_end: function transition_helper_add_end(property, frameIndex, callback) {

    var transitionList = this.transition ;

    if ( transitionList === undefined ) {
      this.transition = [] ;
      transitionList = this.transition ;
    }

    var transitionIndex = transitionHelper.find(property, transitionList) ;    

    var transitionK = this.transition[transitionIndex] ; // initialize

    transitionK = transitionHelper.get_child(transitionK, frameIndex) ;
    transitionK.end = callback ; // only restore UI functionality after the minimum number of frames has been rendered  
    
  },  

  get_child: function transition_helper_get_child (transition, frameIndex) {
    for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
      transition = transition.child ;
    }
    return transition ;    
  },

  update_end_value: function transition_helper_update_end_value (property, newEndValue, transition_creator) {
    // updates end value of matching transition if it exists otherwise do nothing 
    if (transitionList === undefined) {
      this.transition = [] ;
    }    
    var transitionList  = this.transition ;
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex > -1) {
      transitionList[transitionIndex].endValue = newEndValue ;
    } else {
      transitionList.push(transition_creator(newEndValue)) ;
    }
  },

  check_end_value: function transition_helper_check_end_value (property, endValue) {
    // returns true or false if there is a transition object for this property with this end value
    // returns undefined if there is no transition with this property
    var output = {
      check: undefined,
      index: -1,
    } ;
    var transitionList = this.transition ;
    if (transitionList === undefined) {
      this.transition = [] ;
      transitionList = this.transition ;
    }    
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex === -1) {
      return output; // return default output
    } else {
      output.index = transitionIndex ;
      if (transitionList[transitionIndex].endValue === endValue) {
        output.check = true ;
      } else {
        output.check = false ;
      }
      return output ;
    }    
  },

  remove_end: function(item) {

    if(item === undefined) {
      item = this ;
    }

    var endObject = {

      item: item,

      run: function () {

        if(this.item.remove === undefined) {
          this.item.remove = itemHelper.remove ;
        }

        this.item.remove() ;

      },

    } ;

    return endObject ; 

  },

  duration: function(transition) {

    if(transition === undefined) {
      transition = this ;
    }

    var dur = transition.duration ;
    var trans = transition ;

    while(trans.child !== undefined) {
      trans = trans.child ;
      dur += trans.duration ;
    }

    return dur ;

  }

  // set: function transition_helper_set () {
  //   // console.log('detect action set', 'this', this) ;
  //   $Z.detect([this]) ;
  // },

  // reset: function transition_helper_reset () {
  //   // console.log('detect action reset', 'this', this) ;
  //   $Z.detect([]) ; // turn off detection
  // },

} ;