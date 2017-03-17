## LARSSlideShow 1.0

### Description
I created this slideshow plugin a looong time ago while unemployed and just out of school.  It's been sitting unused on an old webserver until now. It was inspired by a photography site's flash photo slideshow.  I wanted that same look on my site, but didn't care much for flash.  This will run on any browser that supports javascript, which includes all iDevices and droids.

This is meant to take up an entire page, save for the header and footers.

This could easily be adapted to use jQuery and very much needs some adapting to newer versions of MooTools.

### Requirements
- MooTools with Fx (Included as submodule)

### Installation
- Download and copy LARSSlideShow.js to wherever it is you put scripts
- Include script in `<head>` - `<script rel="text/javascript" src="scripts/LARSSlideShow.js"></script>`
- Create a container with an id of `body_wrapper` that contains elements with IDs `footer`, `header`
- Create the slideshow `img` element with an ID named `slideshow`, as well as a container div for it with the ID `slideshow_border`
- Change the settings in the .js file to point to the correct images with the correct background colors you would like to be displayed for each image:

```javascript
options: {
	imageContainer: 'slideshow',
	imageNum: 1,
	images: [
		'images/1.jpg',
		'images/6.jpg',
		'images/2.jpg',
		'images/3.jpg',
		'images/5.jpg',
		'images/4.jpg'
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
```

- Add a window event in `<head>` for `domready` that creates the slideshow event:

```javascript
<script rel="text/javascript">
	window.addEvent('domready', function() {
    var newSlideshow = new LARSlideShow();
    window.addEvent('resize', newSlideshow.adjustBodyHeight);
    
    if(Browser.Engine.trident)
      window.addEvent('domready', newSlideshow.adjustBodyHeight);
    else
      window.addEvent('load', newSlideshow.adjustBodyHeight);
  });
</script>
```

#### Basic Page Structure

```html
<div id="header">
</div>
<div id="body_wrapper" style="overflow: hidden;">
	<div id="slideshow_border">
		<img id="slideshow" src="images/1.jpg" />
	</div>
</div>
<div id="footer">
</div>
```

### License
I would love attribution and a link to this page on GitHub [here](https://github.com/larsacus/LARSSlideShow), but it is not required.

```
Copyright (c) 2008-2017 Lars Anderson, drink&apple

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
