WebFontConfig = {

	//  'active' means all requested fonts have finished loading
	//  We set a 1 second delay before calling 'createText'.
	//  For some reason if we don't the browser cannot render the text the first time it's created.
	//active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

	//  The Google Fonts we want to load (specify as many as you like in the array)
	google: {
	  families: ['Revalia']
	}

};

function addText(x, y, text, font, fontSize, anchor) {
    var _text = game.add.text(x, y, text);

    _text.font = font || 'Revalia';
    _text.fontSize = fontSize || 60;

    if(!anchor) {
        // Origin is in the center
       _text.anchor.setTo(0.5);
    }

    return _text;
};
