"use strict"

//Create a Home object.
function Home( path, layContent )
{
	var self = this;
	var Uri = new Array();
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) lay.Animate("FadeIn");
        else lay.Animate( "FadeOut" );
    }
    
    //Called when file is ready to play.
this.player_OnReady = function()
{
    player.Play()
}
//Show media query results.
this.media_OnMediaResult = function( result )
{
    var s = "";
    var t = "";
    for( var i=0; i<result.length; i++ )
    {
        var item = result[i];

        s += item.title+", "+item.albumId+", "+item.album
            +", "+item.artistId+", "+ item.artist+
            ", "+ Math.round(item.duration/1000)+"s" +
            ", "+ Math.round(item.size/1000)+"KB" + 
            ", "+ item.uri +"\n\n";
            Uri[i] = item.uri;
            t += item.title + ",";
    }
    
    list.SetList( t );
    app.HideProgress()
    alert( s.substr(0,2048) )
    
    //Play first file found.
    if( result.length > 0 )
        player.SetFile( result[0].uri )
}

this.Change = function(item, index){
player.SetFile( Uri[index] );
player.Play(  );
}
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "FillXY,VCenter" );
    lay.SetBackColor( color.PINK_LIGHT_5 );
    lay.Hide();
    layContent.AddChild( lay );
    
    var list = app.CreateSpinner( "", 1, 0.1 );
    list.SetOnChange( self.Change );
    lay.AddChild( list );
    //Create media player.
    var player = app.CreateMediaPlayer()
    player.SetOnReady( self.player_OnReady )
   
    //Create media store and set callbacks.
    var media = app.CreateMediaStore()
    media.SetOnMediaResult( self.media_OnMediaResult )
   
    
 media.QueryMedia( "", "artist,album", "external" )
    
    //Add a logo.
	var img = app.CreateImage( "Img/Hello.png", 0.25 );
	//lay.AddChild( img );
	
	//Create a text with formatting.
    var text = "<p><font color=#4285F4><big>Welcome</big></font></p>" + 
    "Todo: Put your home page controls here! </p>" + 
    "<p>You can add links too - <a href=https://play.google.com/store>Play Store</a></p>" +
    "<br><br><p><font color=#4285F4><big><big><b>&larr;</b></big></big> Try swiping from the " + 
    "left and choosing the <b>'New File'</b> option</font></p>";
    var txt = app.CreateText( text, 1, -1, "Html,Link" );
    txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
    txt.SetTextSize( 18 );
    txt.SetTextColor( "#444444" );
    lay.AddChild( txt );
}