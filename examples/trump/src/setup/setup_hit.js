function setup_hit(viz, element, setupHitConfig) {

  if(setupHitConfig === undefined) {
  	setupHitConfig = {} ;
  }

  if(setupHitConfig.elementHealth === undefined) {
  	setupHitConfig.elementHealth = 100 ;
  }

  if(setupHitConfig.healthbarHeight === undefined) {
  	setupHitConfig.healthbarHeight = 7 ;
  }
  
  if(setupHitConfig.audio === undefined) {
    setupHitConfig.audio = viz.audio.hit1 ;
  }

  var audio = setupHitConfig.audio ;

  var healthbar = setup_healthbar (
    viz, 
    setupHitConfig.elementHealth, 
    setupHitConfig.healthbarHeight, 
    setupHitConfig.healthbarY, 
    setupHitConfig.color
  ) ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 

  if(setupHitConfig.healthdrop === undefined) {    
    setupHitConfig.healthdrop = 10 ;
  }
 
  var hit = { // action config object

    active: true,
    perform: hitHelper.perform,
    detect: hitHelper.detect,
    healthbar: healthbar,
    healthdrop: setupHitConfig.healthdrop,
    health_transition: health_transition,
    transition: hit_transition,
    element: element,
    viz: viz,
    audio: audio,
    type_check: function hit_type_check(sourceItem) {
      if(sourceItem.type === element.type) {
        return true ;
      } else {
        return false ;
      }
    },

  } ;	

  return hit ;

}