export default function detect_actions() { // useful for collision detection, etc. but just a placeholder for now
	// if($Z.verbose) console.log('inside', this.name) ;
  return Promise.all($Z.detect()) ;
} ;	