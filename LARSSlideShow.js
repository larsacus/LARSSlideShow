
/**************************************************************

	Script		: LARSSlideshow
	Version		: 1.0
	Authors		: Lars Anderson
	Desc		: 
	License		: MIT
	Copyright	: 2009-2012 Lars Anderson

**************************************************************/

var LARSSlideShow = new Class({
	Implements: [Options],
	options: {
		imageContainer: 'slideshow',
		imageNum: 1,
		images: [
			'LARSSlideShow/1.jpg',
			'LARSSlideShow/6.jpg',
			'LARSSlideShow/2.jpg',
			'LARSSlideShow/3.jpg',
			'LARSSlideShow/5.jpg',
			'LARSSlideShow/4.jpg'
		],
		colors:[
		'#1D3362',
		'#db5278',
		'#681213',
		'#445289',
		'#b79f71',
		'#bc943c',
		],
		img_El:[],
		delay:4500
	},
	
	initialize: function(options){
		this.setOptions(options);
		
		new Asset.images(this.options.images,{			
			onError: function(){
				alert('ERROR LOADING IMAGES!');
			},
			
			onComplete: function(){
				for(i=0;i<this.options.images.length;i++){
					if(!this.options.img_El[i]){
						this.options.img_El[i] = new Element('img',{
							'src':this.options.images[i]
						});
					}
				}
				
				var periodicalImage = this.changeImage.periodical(this.options.delay,this);

			}.bind(this)
		});
		
		//fade out old image							done
		//increment image (get new image)				done
		//replace slideshow img tag with new src		done
		//morph placeholder div to new size				done
		//morph background image						done
		//fade in new image								done
		//repeat after given interval					done
	},
	
	changeImage: function(){
		if(this.options.imageNum === this.options.images.length-1)
			this.options.imageNum=0;
		else
			this.options.imageNum++;
			
		var imageFade = new Fx.Morph($('slideshow'));
		
		var divMorph = new Fx.Morph($('slideshow_border'),{
			onComplete:function(){
				imageFade.start({'opacity':1});
			}
		});	
		
		var backgroundMorph = new Fx.Morph($('body_wrapper'), {
		    duration: 'long',
		    transition: Fx.Transitions.Sine.easeOut
		});
		
		var currentImage = this.options.img_El[this.options.imageNum];
		
		var bodyHeight = getHeight()						//height of current viewport
				-20 										//fiddle number (increase to shrink body height)
				-($('footer').getStyle('height').toInt())	//footer height
				-($('header').getStyle('height').toInt());
		
		//if image width fits in viewport width
		var newDivWidth = Math.floor((currentImage.width*(Math.floor(bodyHeight*9/10))/currentImage.height));
		var newDivHeight = bodyHeight*9/10;
		
		if(newDivWidth+20 > getWidth()){
			//if image width is greater than viewport width
			var newDivWidth = Math.floor(getWidth()*9/10);
			var newDivHeight = Math.floor((currentImage.height*newDivWidth)/currentImage.width);
		}
		
		/*if(newDivWidth > getWidth())
			newDivWidth = Math.floor((currentImage.height*getWidth()*9/10)/currentImage.width)*/
		//var newDivLeftMargin = Math.floor(getWidth()/2-newDivWidth/2-10);
		var newDivTopMargin = bodyHeight/2						//body_wrapper height
								- ((newDivHeight)/2)				//adjustment for image height
								- 10									//adjustment for image border

		//fades out image, sets new img src, then changes div shape to new src size
		imageFade.start({'opacity': 0}).chain(
			function(){
				//sets new image src
				$('slideshow').set('src',currentImage.src);
				$('slideshow').setStyles({
					'width':newDivWidth,
					'height':newDivHeight
				});
				this.callChain();
			}).chain(
			function(){
				//changes div shape to new img size
				backgroundMorph.start({
					'background-color': this.options.colors[this.options.imageNum]
				});
				divMorph.start({
					'width': 	newDivWidth,
					'height': 	newDivHeight,
					'top':		newDivTopMargin//,
					//'left': 	newDivLeftMargin
				});
				//onComplete fades image back in after div has been re-shaped
			}.bind(this));
	},

	adjustBodyHeight: function() {
		var morphBody = new Fx.Morph($('body_wrapper'));
		var morphImage = new Fx.Morph($('slideshow'));
		var morphPlaceholder = new Fx.Morph($('slideshow_border'));

		var bodyHeight = getHeight()							//height of current viewport
					-22 										//fiddle number (increase to shrink body height)
					-($('footer').getStyle('height').toInt())	//footer height
					-($('header').getStyle('height').toInt());	//header height
					
		//if image width fits in viewport width
		var newDivWidth = Math.floor(($('slideshow').getStyle('width').toInt()*(Math.floor(bodyHeight*9/10))/$('slideshow').getStyle('height').toInt()));
		var newDivHeight = bodyHeight*9/10;
		
		if(newDivWidth > getWidth()){
			//if image width is greater than viewport width
			var newDivWidth = Math.floor(getWidth()*9/10);
			var newDivHeight = Math.floor(($('slideshow').getStyle('height').toInt()*newDivWidth)/$('slideshow').getStyle('width').toInt());
		}
		
		//var newDivLeftMargin = Math.floor(getWidth()/2-newDivWidth/2-10);
		var newDivTopMargin = bodyHeight/2						//body_wrapper height
								- ((newDivHeight)/2)				//adjustment for image height
								- 10									//adjustment for image border

		morphBody.start({
				'height': bodyHeight
		});
		morphImage.start({
				'height': 	newDivHeight,
				'width':	newDivWidth
		});
		morphPlaceholder.start({
			'height': 		newDivHeight,
			'width': 		newDivWidth,
			'top':			newDivTopMargin//,
			//'left': 		newDivLeftMargin
		});
	},
});

var getWidth = function() {
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
	} else if( document.documentElement &&  document.documentElement.clientWidth ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
	} else if( document.body && document.body.clientWidth ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
	}
	return myWidth;
};

var getHeight = function() {
	var myHeight = 0;
	if( typeof( window.innerHeight ) == 'number' ) {
		//Non-IE
		myHeight = window.innerHeight;
	} else if( document.documentElement &&  document.documentElement.clientHeight ) {
		//IE 6+ in 'standards compliant mode'
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && document.body.clientHeight ) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}
	return myHeight;
};


